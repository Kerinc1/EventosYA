const jwt = require('jsonwebtoken');
const Event = require('../models/event');
const { sendEmail } = require('../utils/nodemailer');

// Crear evento
const createEvent = async (req, res) => {
    try {
        console.log("Datos del usuario decodificado:", req.user);
        console.log("ID del usuario:", req.userId);
        console.log("Datos recibidos:", req.body);
        console.log("Archivo recibido:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No se ha recibido ninguna imagen" });
        }

        const { title, description, date, location } = req.body;
        const imageUrl = req.file.location; 

        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "El userId es requerido en el token" });
        }

        if (!title || !description || !date || !location || !imageUrl) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            image: imageUrl, 
            userId
        });

        await newEvent.save();
        res.status(201).json(newEvent);  // Responder con el evento creado
    } catch (error) {
        console.error("Error al crear evento:", error);
        res.status(500).json({ message: "Error al crear evento", error: error.message });
    }
};



//obtener eventos detallados
const getSpecificEvent= async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento', error: error.message });
    }
};



// Obtener eventos
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener eventos por userId
const getEventsByUserId = async (req, res) => {
    try {
        const userId = req.userId; // Obtener el userId del token decodificado
        console.log("User ID in controller:", userId); // Verifica el userId en el controlador

        const events = await Event.find({ userId });
        console.log("Events found:", events); // Verifica los eventos encontrados

        if (events.length === 0) {
            console.log("No events found for user ID:", userId);
            return res.status(404).json({ message: 'No events found for this user.' });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: 'Error al obtener eventos del usuario', error: error.message });
    }
};

// Actualizar evento
const updateEvent = async (req, res) => {
    try {
        console.log("Datos del usuario decodificado:", req.user);
        console.log("ID del usuario:", req.userId);
        console.log("Datos recibidos:", req.body);
        console.log("Archivo recibido:", req.file);

        const { eventId } = req.params;
        const userId = req.userId; // Usar userId de la solicitud decodificada

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        if (event.userId.toString() !== userId) {
            return res.status(403).json({ message: 'No tienes permiso para editar este evento' });
        }

        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        
        // Solo actualizar la imagen si se ha enviado una nueva imagen
        if (req.file) {
            event.image = req.file.location;
        }

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        console.error("Error al actualizar evento:", error);
        res.status(500).json({ message: 'Error al actualizar evento', error: error.message });
    }
};



// Eliminar evento
const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log("Event ID:", eventId);
        console.log("Decoded user in request:", req.user);
        console.log("User ID from request:", req.userId);

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        console.log("Event found:", event);

        if (event.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este evento' });
        }

        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar evento:", error);
        res.status(500).json({ message: 'Error al eliminar evento', error: error.message });
    }
};




// Inscripción en evento
const subscribeEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId).populate('userId', 'email username');

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }

        if (!event.userId) {
            return res.status(404).json({ message: 'Usuario creador del evento no encontrado.' });
        }

        const user = req.user; // Asegúrate de que `req.user` está definido
        console.log("Usuario autenticado:", user);

        if (!user || !user.email) {
            return res.status(400).json({ message: 'Error: El usuario autenticado no tiene un correo válido.' });
        }

        const eventCreatorEmail = event.userId.email;

        // Aquí se agrega el HTML con el diseño para el correo
        const emailContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 20px;
                        }
                        .container {
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color:rgb(3, 7, 223);
                        }
                        p {
                            font-size: 16px;
                            color: #333333;
                        }
                        .footer {
                            font-size: 14px;
                            color: #888888;
                            margin-top: 20px;
                        }
                        .image {
                            max-width: 100%;
                            border-radius: 8px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>¡Te has inscrito exitosamente!</h1>
                        <p>Hola Aventurero!</p>
                        <p>Te has inscrito exitosamente en el evento <strong>"${event.title}"</strong>.</p>
                        <p><strong>Descripción:</strong> ${event.description}</p>
                        <p><strong>Fecha:</strong> ${event.date}</p>
                        <p><strong>Contacto del creador:</strong> ${eventCreatorEmail}</p>
                        <img src="cid:eventImage" alt="Imagen del evento" class="image" />
                        <div class="footer">
                            <p>¡Nos vemos allí!</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        // Aquí asumimos que la imagen está almacenada en un directorio local. Si la imagen está en S3 o en otro servicio, necesitarías obtenerla de esa manera.
        const imagePath = event.image; // Cambia esta ruta a la ubicación de tu imagen

        // Enviar el correo con la imagen incrustada
        await sendEmail(user.email, 'Inscripción Exitosa', emailContent, imagePath);
        res.status(200).json({ message: 'Te has inscrito exitosamente en el evento.' });
    } catch (error) {
        console.error('Error inscribiéndose en evento:', error);
        res.status(500).json({ message: 'Error inscribiéndose en evento.' });
    }
};





module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    subscribeEvent,
    getEventsByUserId,
    getSpecificEvent
};
