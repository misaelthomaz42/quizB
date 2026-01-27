import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Get Random Questions
router.get('/questions', async (req, res) => {
    try {
        const [questions] = await db.query('SELECT * FROM questions ORDER BY RAND() LIMIT 10');

        const questionIds = questions.map(q => q.id);
        if (questionIds.length === 0) return res.json({ questions: [] });

        const [options] = await db.query(`SELECT * FROM question_options WHERE question_id IN (${questionIds.join(',')})`);

        const formattedQuestions = questions.map(q => ({
            id: q.id,
            text: q.question_text,
            options: options.filter(opt => opt.question_id === q.id).map(opt => opt.option_text)
        }));

        res.json({ questions: formattedQuestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar questões' });
    }
});

// Start Exam
router.post('/start', async (req, res) => {
    const { userId } = req.body;
    try {
        // 1. Check if Quiz is Globally Active
        const [settings] = await db.query("SELECT setting_value FROM system_settings WHERE setting_key = 'quiz_active'");
        if (settings.length > 0 && settings[0].setting_value === 'false') {
            // If user is admin (optional check), maybe allow? But spec says admin starts/stops.
            // Let's block everyone if false.
            return res.status(403).json({ message: 'A prova está pausada pelo administrador.' });
        }

        const [attempts] = await db.query('SELECT * FROM exam_attempts WHERE user_id = ? ORDER BY start_time DESC LIMIT 1', [userId]);

        if (attempts.length > 0) {
            const lastAttempt = attempts[0];
            if (lastAttempt.status === 'submitted') {
                return res.json({ status: 'submitted' });
            }
            if (lastAttempt.status === 'blocked') {
                return res.json({ status: 'blocked' });
            }
        } else {
            await db.query('INSERT INTO exam_attempts (user_id) VALUES (?)', [userId]);
        }

        // Fetch 10 Random Questions
        const [questions] = await db.query('SELECT * FROM questions ORDER BY RAND() LIMIT 10');
        const questionIds = questions.map(q => q.id);
        let formattedQuestions = [];

        if (questionIds.length > 0) {
            const [options] = await db.query(`SELECT * FROM question_options WHERE question_id IN (${questionIds.join(',')})`);
            formattedQuestions = questions.map(q => ({
                id: q.id,
                text: q.question_text,
                options: options.filter(opt => opt.question_id === q.id).map(opt => opt.option_text)
            }));
        }

        res.json({ status: 'started', questions: formattedQuestions });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao iniciar prova' });
    }
});

// Submit Exam
router.post('/submit', async (req, res) => {
    const { userId, answers } = req.body;

    try {
        const [attempts] = await db.query('SELECT id FROM exam_attempts WHERE user_id = ? AND status = "in_progress" ORDER BY start_time DESC LIMIT 1', [userId]);

        if (attempts.length === 0) {
            return res.status(400).json({ message: 'Nenhuma prova ativa encontrada.' });
        }
        const attemptId = attempts[0].id;

        let totalScore = 0;
        const POINTS_PER_QUESTION = 0.5;

        for (const [qId, optText] of Object.entries(answers)) {
            // Find the option ID and check if correct
            const [opts] = await db.query('SELECT id, is_correct FROM question_options WHERE question_id = ? AND option_text = ?', [qId, optText]);

            if (opts.length > 0) {
                const option = opts[0];
                await db.query('INSERT INTO user_answers (attempt_id, question_id, selected_option_id) VALUES (?, ?, ?)',
                    [attemptId, qId, option.id]);

                if (option.is_correct) {
                    totalScore += POINTS_PER_QUESTION;
                }
            }
        }

        // Update attempt with status AND score
        await db.query('UPDATE exam_attempts SET status = "submitted", end_time = CURRENT_TIMESTAMP, score = ? WHERE id = ?',
            [totalScore, attemptId]);

        res.json({ success: true, score: totalScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar prova' });
    }
});

// Block User
router.post('/block', async (req, res) => {
    const { userId } = req.body;
    try {
        await db.query('UPDATE users SET status = "blocked" WHERE id = ?', [userId]);
        await db.query('UPDATE exam_attempts SET status = "blocked" WHERE user_id = ? AND status = "in_progress"', [userId]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao bloquear' });
    }
});

// Status
router.get('/status/:userId', async (req, res) => {
    try {
        const [attempts] = await db.query('SELECT * FROM exam_attempts WHERE user_id = ? ORDER BY start_time DESC LIMIT 1', [req.params.userId]);
        if (attempts.length === 0) return res.json({});

        const last = attempts[0];
        if (last.status === 'submitted') return res.json({ submitted: true });
        if (last.status === 'blocked') return res.json({ blocked: true });
        return res.json({ started: true });
    } catch (error) {
        res.status(500).json({ message: 'Erro' });
    }
});

export default router;
