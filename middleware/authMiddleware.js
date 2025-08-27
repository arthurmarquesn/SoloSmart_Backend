const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_super_secreta';

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Token inválido' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // agora o usuário fica disponível no req
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}

module.exports = authMiddleware;
