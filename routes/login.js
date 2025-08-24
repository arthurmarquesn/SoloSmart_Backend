const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Login de usuário
router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        // Buscar usuário no banco
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = rows[0];

        // Comparar senhas
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login realizado com sucesso!', user: { email: user.email, uf: user.uf, cidade: user.cidade } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
});

module.exports = router;
