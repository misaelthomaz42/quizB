import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { nome, email, setor, congregacao, idade, password } = req.body;

    try {
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        // Using `senha_hash` column for password
        await db.query(
            'INSERT INTO users (nome, email, setor, congregacao, idade, senha_hash) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, email, setor, congregacao, idade, password]
        );

        res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const user = users[0];

        if (user.senha_hash !== password) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({ message: 'Usuário bloqueado. Por favor falar com os adm.' });
        }

        delete user.senha_hash;

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

export default router;
