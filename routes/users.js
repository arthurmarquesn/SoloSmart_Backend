const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Cadastro de usuário
router.post('/', async (req, res) => {
    const { email, senha, uf, cidade } = req.body;

    if (!email || !senha || !uf || !cidade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        // Criptografar senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir no banco
        const [result] = await db.query(
            'INSERT INTO users (email, senha, uf, cidade) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, uf, cidade]
        );

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
});

module.exports = router;
