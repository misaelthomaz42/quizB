import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Middleware to check if user is admin
// We expect userId in the header or body for simplicity in this prototype. 
// In a real app, we'd use JWT. Here we'll query the DB to verify role on every admin request for security.
const isAdmin = async (req, res, next) => {
    // Expecting 'x-user-id' header
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const [users] = await db.query('SELECT is_admin FROM users WHERE id = ?', [userId]);
        if (users.length === 0 || !users[0].is_admin) {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores.' });
        }
        next();
    } catch (e) {
        res.status(500).json({ message: 'Erro ao verificar permissões' });
    }
};

router.use(isAdmin);

// --- User Management ---

// List Users
router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, nome, email, setor, congregacao, idade, status, is_admin FROM users ORDER BY nome');
        res.json(users);

    } catch (e) {
        res.status(500).json({ message: 'Erro ao listar usuários' });
    }
});

// Update User (Block/Unblock, Authorize Admin)
router.put('/users/:id', async (req, res) => {
    const { status, is_admin } = req.body || {};
    try {
        await db.query('UPDATE users SET status = ?, is_admin = ? WHERE id = ?',
            [status, is_admin, req.params.id]);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
});

// Delete User
router.delete('/users/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
});

// --- Question Management ---

// List Questions
router.get('/questions', async (req, res) => {
    try {
        const [questions] = await db.query('SELECT * FROM questions ORDER BY id DESC');
        // Fetch options for all questions
        // This might be heavy if many questions, but ok for now
        const questionIds = questions.map(q => q.id);
        let optionsMap = {};

        if (questionIds.length > 0) {
            const [options] = await db.query(`SELECT * FROM question_options WHERE question_id IN (${questionIds.join(',')})`);
            options.forEach(opt => {
                if (!optionsMap[opt.question_id]) optionsMap[opt.question_id] = [];
                optionsMap[opt.question_id].push(opt);
            });
        }

        const data = questions.map(q => ({
            ...q,
            options: optionsMap[q.id] || []
        }));

        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao listar questões' });
    }
});

// Add Question
router.post('/questions', async (req, res) => {
    const { question_text, options } = req.body || {}; // options: [{ text: '...', is_correct: true }, ...]

    if (!options || options.length !== 4) {
        return res.status(400).json({ message: 'Necessário fornecer 4 opções.' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [qResult] = await connection.query('INSERT INTO questions (question_text) VALUES (?)', [question_text]);
        const questionId = qResult.insertId;

        for (const opt of options) {
            await connection.query('INSERT INTO question_options (question_id, option_text, is_correct) VALUES (?, ?, ?)',
                [questionId, opt.text, opt.is_correct]);
        }

        await connection.commit();
        res.json({ success: true, id: questionId });
    } catch (e) {
        await connection.rollback();
        res.status(500).json({ message: 'Erro ao criar questão' });
    } finally {
        connection.release();
    }
});

// Delete Question
router.delete('/questions/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM questions WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ message: 'Erro ao deletar questão' });
    }
});

// --- Quiz Control ---

// Get Quiz Status
router.get('/quiz-status', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT setting_value FROM system_settings WHERE setting_key = 'quiz_active'");
        const active = rows.length > 0 ? rows[0].setting_value === 'true' : true;

        const [resultsRows] = await db.query("SELECT setting_value FROM system_settings WHERE setting_key = 'results_released'");
        const resultsReleased = resultsRows.length > 0 ? resultsRows[0].setting_value === 'true' : false;

        res.json({ active, resultsReleased });
    } catch (e) {
        res.status(500).json({ message: 'Erro' });
    }
});

// Toggle Quiz Status
router.post('/quiz-control', async (req, res) => {
    const { active } = req.body || {}; // boolean
    try {
        await db.query("INSERT INTO system_settings (setting_key, setting_value) VALUES ('quiz_active', ?) ON DUPLICATE KEY UPDATE setting_value = ?",
            [active.toString(), active.toString()]);
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Erro ao atualizar status' });
    }
});

// Toggle Results Released Status
router.post('/results-control', async (req, res) => {
    const { released } = req.body || {}; // boolean
    try {
        await db.query("INSERT INTO system_settings (setting_key, setting_value) VALUES ('results_released', ?) ON DUPLICATE KEY UPDATE setting_value = ?",
            [released.toString(), released.toString()]);
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Erro ao atualizar status dos resultados' });
    }
});

// --- Results & Ranking ---

router.get('/results', async (req, res) => {
    try {
        // Complex query to get Best Score and Time for each user who submitted
        // Prioritize: High Score > Low Time (duration)
        const sql = `
            SELECT 
                u.nome, 
                u.setor, 
                u.congregacao, 
                ea.score, 
                TIMESTAMPDIFF(SECOND, ea.start_time, ea.end_time) as duration_seconds, 
                ea.end_time,
                ea.id as attempt_id,
                ea.user_id
            FROM exam_attempts ea
            JOIN users u ON ea.user_id = u.id
            WHERE ea.status = 'submitted'
            ORDER BY ea.score DESC, duration_seconds ASC
        `;
        const [results] = await db.query(sql);
        res.json(results);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao buscar resultados' });
    }
});

// Get User Answers for a specific attempt (for admin to view the exam)
router.get('/results/:attemptId/answers', async (req, res) => {
    try {
        console.log('🔍 Buscando respostas para attempt_id:', req.params.attemptId);

        const sql = `
            SELECT 
                q.id,
                q.question_text,
                qo.id as option_id,
                qo.option_text,
                qo.is_correct,
                ua.selected_option_id,
                (qo.id = ua.selected_option_id AND qo.is_correct = 1) as user_answer_correct
            FROM exam_attempts ea
            JOIN user_answers ua ON ea.id = ua.attempt_id
            JOIN questions q ON ua.question_id = q.id
            JOIN question_options qo ON q.id = qo.question_id
            WHERE ea.id = ?
            ORDER BY q.id, qo.id
        `;
        const [rows] = await db.query(sql, [req.params.attemptId]);

        console.log(`📊 Encontradas ${rows.length} linhas`);

        if (rows.length === 0) {
            console.log('⚠️ Nenhuma resposta encontrada para este attempt_id');
            return res.json([]);
        }

        // Group by questions
        const questionsMap = {};
        rows.forEach(row => {
            if (!questionsMap[row.id]) {
                // Determinar se o usuário acertou essa questão
                const selectedOption = rows.find(r => r.id === row.id && r.option_id === row.selected_option_id);
                const userAnswerCorrect = selectedOption ? selectedOption.is_correct : false;

                questionsMap[row.id] = {
                    id: row.id,
                    question_text: row.question_text,
                    selected_option_id: row.selected_option_id,
                    user_answer_correct: userAnswerCorrect,
                    options: []
                };
            }
            questionsMap[row.id].options.push({
                id: row.option_id,
                option_text: row.option_text,
                is_correct: row.is_correct
            });
        });

        const result = Object.values(questionsMap);
        console.log(`✅ Retornando ${result.length} questões`);
        res.json(result);
    } catch (e) {
        console.error('❌ ERRO ao buscar respostas:', e.message);
        console.error('Stack:', e.stack);
        res.status(500).json({ message: 'Erro ao buscar respostas', error: e.message });
    }
});

// Delete Result
router.delete('/results/:attemptId', async (req, res) => {
    try {
        await db.query('DELETE FROM exam_attempts WHERE id = ?', [req.params.attemptId]);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ message: 'Erro ao deletar resultado' });
    }
});

export default router;
