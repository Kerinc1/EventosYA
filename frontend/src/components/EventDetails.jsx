import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificEvent, subscribeToEvent } from '../api/api';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import '../styles/EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false); // Para controlar el estado de carga

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getSpecificEvent(eventId);
        setEvent(response.data);
      } catch (error) {
        console.error('Error al cargar el evento', error);
      }
    };

    fetchEvent();
  }, [eventId]);

    // Obtener el token desde el almacenamiento local (o donde lo tengas guardado)
    const token = localStorage.getItem('token');

  // Manejar la suscripción al evento
  const handleSubscribe = async () => {
    setLoading(true);

    try {
      await subscribeToEvent(eventId, token); // Llamada a la función de suscripción
      // Mostrar la alerta de éxito
      Swal.fire({
        title: '¡Inscripción exitosa!',
        text: 'Te has inscrito correctamente al evento y recibirás la información por correo.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      // Mostrar la alerta de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al inscribirse en el evento. Por favor, inténtalo más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="event-details-container">
      <div className="event-details-image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-details-info">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p><strong>Fecha:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Ubicación:</strong> {event.location}</p>
        
        {/* Botón para inscribirse */}
        <button 
          className="btn btn-primary" 
          onClick={handleSubscribe} 
          disabled={loading}
        >
          {loading ? 'Inscribiendo...' : 'Participar'}
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
