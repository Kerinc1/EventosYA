const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Acceso denegado, token no proporcionado.' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }
        req.user = decoded;  // Asigna el usuario decodificado al request
        req.userId = decoded.id;  // Agregar el userId explícitamente 
        next();
    });
}

module.exports = authenticateToken; // Asegúrate de exportar correctamente
