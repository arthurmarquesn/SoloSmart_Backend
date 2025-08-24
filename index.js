const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/location/ufs', require('./routes/ufs'));
app.use('/api/location/cidades', require('./routes/cidades'));
app.use('/api/users', require('./routes/users')); // 🔑 Adicionada a rota de usuários
app.use('/api/login', require('./routes/login'));

// Teste de rota raiz
app.get('/', (req, res) => {
    res.send('API do SoloSmart rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
