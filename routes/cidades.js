const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:uf', async (req, res) => {
    try {
        const uf = req.params.uf.toUpperCase();
        const [rows] = await pool.query('SELECT nome FROM cidades WHERE uf = ?', [uf]);
        res.json(rows.map(r => r.nome));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});

module.exports = router;
