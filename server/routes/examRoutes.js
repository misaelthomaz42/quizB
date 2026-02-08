import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Get Random Questions
router.get('/questions', async (req, res) => {
    try {
        // Updated: Order by creation date (newest first) instead of random
        // Updated: Order by creation date (oldest first), showing ALL questions
        const [questions] = await db.query('SELECT * FROM questions ORDER BY id ASC');

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
            return res.status(403).json({ message: 'A prova está pausada pelo administrador.' });
        }

        // 2. Check for ANY existing attempt for this user
        const [attempts] = await db.query('SELECT * FROM exam_attempts WHERE user_id = ? ORDER BY start_time DESC LIMIT 1', [userId]);

        if (attempts.length > 0) {
            const lastAttempt = attempts[0];
            // If they already finished or were blocked, don't allow a new one
            if (lastAttempt.status === 'submitted') return res.json({ status: 'submitted' });
            if (lastAttempt.status === 'blocked') return res.json({ status: 'blocked' });

            // If they have one 'in_progress', we REUSE it instead of creating a new one
        } else {
            // Only create if NO attempt exists at all
            await db.query('INSERT INTO exam_attempts (user_id, status) VALUES (?, "in_progress")', [userId]);
        }

        // 3. Fetch Questions (Order by ID ASC, ALL questions)
        const [questions] = await db.query('SELECT * FROM questions ORDER BY id ASC');
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
        const POINTS_PER_QUESTION = 10 / 28;

        if (Object.keys(answers).length > 0) {
            // 1. Fetch all options for the submitted questions in ONE query
            const questionIds = Object.keys(answers);
            const [options] = await db.query(
                `SELECT id, question_id, option_text, is_correct 
                 FROM question_options 
                 WHERE question_id IN (${questionIds.join(',')})`
            );

            // 2. Map answers and calculate score in memory
            const insertValues = [];
            for (const [qId, optText] of Object.entries(answers)) {
                const option = options.find(o => o.question_id == qId && o.option_text === optText);
                if (option) {
                    insertValues.push([attemptId, qId, option.id]);
                    if (option.is_correct) {
                        totalScore += POINTS_PER_QUESTION;
                    }
                }
            }

            // 3. Bulk insert user answers in ONE query
            if (insertValues.length > 0) {
                await db.query(
                    'INSERT INTO user_answers (attempt_id, question_id, selected_option_id) VALUES ?',
                    [insertValues]
                );
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
        // Check global results release status
        const [settings] = await db.query("SELECT setting_value FROM system_settings WHERE setting_key = 'results_released'");
        const resultsReleased = settings.length > 0 ? settings[0].setting_value === 'true' : false;

        const [attempts] = await db.query(`
            SELECT *, 
            TIMESTAMPDIFF(SECOND, start_time, end_time) as duration_seconds 
            FROM exam_attempts 
            WHERE user_id = ? 
            ORDER BY start_time DESC LIMIT 1
        `, [req.params.userId]);

        const [qCount] = await db.query('SELECT COUNT(*) as total FROM questions');
        const totalQuestions = qCount[0].total;

        if (attempts.length === 0) return res.json({ resultsReleased, totalQuestions });

        const last = attempts[0];
        if (last.status === 'submitted') {
            // Calculate correct answers by querying user_answers directly
            const [correctAnswers] = await db.query(`
                SELECT COUNT(*) as count 
                FROM user_answers ua 
                JOIN question_options qo ON ua.selected_option_id = qo.id 
                WHERE ua.attempt_id = ? AND qo.is_correct = 1
            `, [last.id]);
            const correctCount = correctAnswers[0].count;

            // Get total questions answered in this attempt
            const [answers] = await db.query('SELECT COUNT(*) as total FROM user_answers WHERE attempt_id = ?', [last.id]);
            const totalAnswered = answers[0].total;

            return res.json({
                submitted: true,
                resultsReleased,
                score: last.score,
                correct: correctCount,
                wrong: totalAnswered - correctCount,
                total: totalAnswered,
                startTime: last.start_time,
                endTime: last.end_time,
                duration: last.duration_seconds,
                attemptId: last.id,
                totalQuestions: totalQuestions
            });
        }
        if (last.status === 'blocked') return res.json({ blocked: true, totalQuestions });
        return res.json({ started: true, totalQuestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar status' });
    }
});

// Get User Answers for personal view
router.get('/results/user/:userId', async (req, res) => {
    try {
        const [attempts] = await db.query('SELECT id FROM exam_attempts WHERE user_id = ? AND status = "submitted" ORDER BY start_time DESC LIMIT 1', [req.params.userId]);

        if (attempts.length === 0) return res.status(404).json({ message: 'Nenhuma prova finalizada encontrada.' });

        const attemptId = attempts[0].id;

        const sql = `
            SELECT 
                q.id,
                q.question_text,
                qo.id as option_id,
                qo.option_text,
                qo.is_correct,
                ua.selected_option_id
            FROM user_answers ua
            JOIN questions q ON ua.question_id = q.id
            JOIN question_options qo ON q.id = qo.question_id
            WHERE ua.attempt_id = ?
            ORDER BY q.id, qo.id
        `;
        const [rows] = await db.query(sql, [attemptId]);

        // Group by questions
        const questionsMap = {};
        rows.forEach(row => {
            if (!questionsMap[row.id]) {
                questionsMap[row.id] = {
                    id: row.id,
                    question_text: row.question_text,
                    selected_option_id: row.selected_option_id,
                    options: []
                };
            }
            questionsMap[row.id].options.push({
                id: row.option_id,
                option_text: row.option_text,
                is_correct: row.is_correct
            });
        });

        res.json(Object.values(questionsMap));
    } catch (e) {
        res.status(500).json({ message: 'Erro ao buscar respostas' });
    }
});

export default router;
