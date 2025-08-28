// routes/sensor.js
const express = require('express');
const router = express.Router();

// Recebe dados do sensor via POST
router.post('/', (req, res) => {
    const { sensorId, umidade } = req.body;
    console.log(`Sensor ${sensorId}: ${umidade}%`);
    res.json({ message: 'Dados recebidos com sucesso!' });
});

module.exports = router;
