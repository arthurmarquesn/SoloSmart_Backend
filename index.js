const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const dotenv = require('dotenv');
dotenv.config();
// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/location/ufs', require('./routes/ufs'));
app.use('/api/location/cidades', require('./routes/cidades'));
app.use('/api/users', require('./routes/users')); 
app.use('/api/login', require('./routes/login'));
app.use('/api/redefsenha', require('./routes/redefsenha'));
app.use('/api/users', require('./routes/users'));
app.use('/api/sensor', require('./routes/sensor'));

// Teste de rota raiz
app.get('/', (req, res) => {
    res.send('API do SoloSmart rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: ${PORT}`  );
});
