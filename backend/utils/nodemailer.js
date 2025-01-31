const nodemailer = require('nodemailer');
require('dotenv').config();

// Configurar el transportador correctamente
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes cambiarlo si usas otro proveedor
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verificar que Nodemailer está configurado correctamente
transporter.verify((error, success) => {
  if (error) {
    console.error('Error en la configuración de Nodemailer:', error);
  } else {
    console.log('Servidor de correo listo para enviar emails');
  }
});

// Función para enviar correos
const sendEmail = async (to, subject, htmlContent, imagePath) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Debe coincidir con el usuario autenticado
        to,
        subject,
        html: htmlContent, // Usamos el contenido HTML con diseño y la imagen
        attachments: [
            {
                filename: 'event-image.jpg', // Nombre del archivo adjunto
                path: imagePath,  // Ruta del archivo de la imagen
                cid: 'eventImage',  // Content-ID para hacer referencia a la imagen dentro del HTML
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito a:', to);
    } catch (error) {
        console.error('Error enviando el correo:', error);
    }
};


module.exports = { sendEmail };
