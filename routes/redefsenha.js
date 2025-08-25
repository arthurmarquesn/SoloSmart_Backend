const express = require('express');
const router = express.Router();
const db = require('../db'); // sua conexão MySQL
const bcrypt = require('bcryptjs');

// Redefinir senha
router.put('/', async (req, res) => {
    const { email, novaSenha } = req.body;

    if (!email || !novaSenha) {
        return res.status(400).json({ message: 'Email e nova senha são obrigatórios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(novaSenha, 10);

        const [result] = await db.query(
            'UPDATE users SET senha = ? WHERE email = ?',
            [hashedPassword, email]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao redefinir senha' });
    }
});

module.exports = router;
