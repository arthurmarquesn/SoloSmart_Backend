const express = require('express');
const router = express.Router();

// Guarda a última leitura
let ultimaLeitura = { sensorId: "ESP32_1", umidade: 0 };

// Recebe dados do ESP via POST
router.post('/', (req, res) => {
    console.log("📥 Dados recebidos do sensor:", req.body);

    if (req.body.umidade !== undefined) {
        ultimaLeitura = req.body; // salva o valor recebido
    }

    res.json({ message: "Dados recebidos com sucesso!", recebido: req.body });
});

// Endpoint GET para o Angular ler os dados
router.get('/', (req, res) => {
    res.json({ message: "Dados retornados com sucesso!", recebido: ultimaLeitura });
});

module.exports = router;
