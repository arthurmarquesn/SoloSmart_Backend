const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/authMiddleware');

// Cadastro de usuário
router.post('/', async (req, res) => {
    const { email, senha, uf, cidade } = req.body;

    if (!email || !senha || !uf || !cidade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        // Verificar se o e-mail já existe
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Criptografar senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir no banco
        await db.query(
            'INSERT INTO users (email, senha, uf, cidade) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, uf, cidade]
        );

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
});

// 🔒 Rota protegida - só acessa com token válido
router.get('/perfil', authMiddleware, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, email, uf, cidade FROM users WHERE id = ?', [req.user.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ message: 'Acesso autorizado', user: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar perfil do usuário' });
    }
});

module.exports = router;
