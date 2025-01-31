const express = require('express');
const router = express.Router();
const { createEvent, getEvents, updateEvent, deleteEvent, subscribeEvent,getEventsByUserId,getSpecificEvent } = require('../controllers/eventController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../utils/upload'); // Asegúrate de importar correctamente

// Rutas de eventos con autenticación JWT
router.post('/events', authenticateToken, upload.single('image'), createEvent); // Requiere autenticación y manejo de archivos
router.get('/', getEvents); // No requiere autenticación
router.get('/events/user', authenticateToken, getEventsByUserId); // Requiere autenticación
router.put('/events/:eventId', authenticateToken, upload.single('image'), updateEvent); // Requiere autenticación
router.delete('/events/:eventId', authenticateToken, deleteEvent); // Requiere autenticación
router.get('/events/:eventId',getSpecificEvent ); 


// Ruta para inscribirse en un evento
router.post('/subscribe/:eventId', authenticateToken, subscribeEvent); // Requiere autenticación

module.exports = router;

