const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors'); 
require('dotenv').config(); 


const app = express();
const port = process.env.PORT || 10000;

app.use(cors()); 

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB conectada'))
  .catch(err => console.error('DB error de conexion:', err));

app.use(bodyParser.json());

//Rutas


app.use('/auth', authRoutes);
app.use('/api/', eventRoutes);


// Middleware de manejo de errores generales 
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto:  http://localhost:${port}/`);
});
