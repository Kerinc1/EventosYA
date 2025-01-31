import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:5001'; // Actualiza la URL base

// Función para registrar un nuevo usuario
export const registerUser = (user) => axios.post(`${API_URL}/auth/register`, user);

// Función para hacer login de un usuario
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log("Login exitoso:", response.data); // Verifica la respuesta del login
    return response.data;
  } catch (error) {
    console.error("Error al hacer login:", error.response ? error.response.data : error); // Maneja los errores de login
    throw error;
  }
};

export const getEvents = (token) => axios.get(`${API_URL}/api/events/user`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const getAllEvents = (token) => axios.get(`${API_URL}/api/`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const getSpecificEvent = (eventId) => axios.get(`${API_URL}/api/events/${eventId}`);

export const createEvent = async (eventData, token) => {
  console.log('Enviando a la API:', eventData);

  try {
    const response = await axios.post(`${API_URL}/api/events`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Esto indica que se envía un archivo
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error en createEvent:', error);
    if (error.response) {
      console.log('Respuesta del error:', error.response.data);
    }
    throw error;
  }
};

export const updateEvent = async (eventData, token, eventId) => {
  console.log('Enviando a la API:', eventData);

  try {
    const response = await axios.put(`${API_URL}/api/events/${eventId}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error en updateEvent:', error);
    if (error.response) {
      console.log('Respuesta del error:', error.response.data);
    }
    throw error;
  }
};



export const deleteEvent = (eventId, token) => axios.delete(`${API_URL}/api/events/${eventId}`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const getEventById = (eventId, token) => axios.get(`${API_URL}/api/events/${eventId}`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const subscribeToEvent = async (eventId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/subscribe/${eventId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud de suscripción:', error.response.data);
    throw new Error(error.response.data.message || 'Hubo un error al suscribirse al evento');
  }
};

