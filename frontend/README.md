# EventosYA - Plataforma de Publicación de Eventos

## Descripción

EventosYA es una plataforma web que permite a los usuarios crear, gestionar y descubrir eventos. Los organizadores pueden registrar eventos con detalles como título, descripción, fecha, ubicación e imagen. Los usuarios pueden navegar y explorar los eventos disponibles en la plataforma.

## Tecnologías Utilizadas

### Frontend:
- React.js con Vite
- React Router para la navegación
- Bootstrap para el diseño

### Backend:
- Node.js con Express.js
- MongoDB con Mongoose
- Autenticación con JWT (JSON Web Token)
- Multer y AWS S3 para la carga de imágenes
- Nodemailer para envío de emails

## Características Principales
- Registro e inicio de sesión de usuarios
- Creación, edición y eliminación de eventos
- Carga de imágenes a AWS S3
- Protección de rutas con JWT
- Envío de emails
- Inscripción en eventos

## Instalación y Configuración

### Requisitos Previos
- Node.js y npm instalados
- MongoDB en local o en la nube
- Claves de acceso a AWS S3 (si se usa almacenamiento en la nube)

### Instalación del Proyecto

Clonar el repositorio:
```sh
git clone https://github.com/Kerinc1/EventosYA
cd EventosYA
```

Instalar dependencias del backend:
```sh
cd backend
npm install
```

Crear un archivo `.env` en la carpeta backend con las siguientes variables de entorno:
```env
MONGODB_URI
SECRET_KEY
TOKEN_EXPIRATION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_S3_BUCKET_NAME
EMAIL_USER
EMAIL_PASS
```

Iniciar el servidor backend:
```sh
npm start
```

Instalar dependencias del frontend:
```sh
cd ../frontend
npm install
```

Iniciar la aplicación frontend:
```sh
npm run dev
```

## Uso

- Accede a `http://localhost:5001` para ver la aplicación en el navegador.
- Regístrate o inicia sesión para gestionar eventos.
- Explora los eventos creados por otros usuarios.

## API Endpoints

| Método | Ruta | Descripción |
|--------|------------------------|----------------------------------------------|
| POST   | /api/auth/register    | Registra un nuevo usuario |
| POST   | /api/auth/login       | Inicia sesión y devuelve un token JWT |
| GET    | /api/events           | Obtiene todos los eventos |
| POST   | /api/events           | Crea un nuevo evento (requiere autenticación) |
| PUT    | /api/events/:id       | Actualiza un evento (requiere autenticación) |
| DELETE | /api/events/:id       | Elimina un evento (requiere autenticación) |
| GET    | /api/events/:eventId  | Obtiene un evento específico |
| GET    | /api/events/user      | Obtiene los eventos creados por un usuario (requiere autenticación) |
| POST   | /api/subscribe/:eventId | Inscribirse en un evento (requiere autenticación) |

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza los cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube los cambios a tu repositorio (`git push origin feature-nueva-funcionalidad`).
5. Crea un Pull Request.



