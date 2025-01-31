require('dotenv').config(); // Carga las variables de entorno

module.exports = {
    secret: process.env.SECRET_KEY,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
  };
  