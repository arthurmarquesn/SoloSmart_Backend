const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;
const dotenv = require('dotenv');
dotenv.config();
// Middlewares
app.use(cors());
app.use(express.json());
const sensor = require('./routes/sensor');
const users = require('./routes/users');
const redefsenha = require('./routes/redefsenha');
const login = require('./routes/login');
const clima = require('./routes/clima');

// Rotas

app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/redefsenha', redefsenha);
app.use('/api/users', users);
app.use('/api/sensor', sensor);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/api/clima', clima);


// Teste de rota raiz
app.get('/', (req, res) => {
    res.send('API do SoloSmart rodando!');
});
app.get('/api/sensor', (req, res) => {
  res.json({
    message: "Dados recebidos com sucesso!",
    recebido: { sensorId: "ESP32_1", umidade: 64  }
  });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor rodando em http://0.0.0.0:3000");
});
