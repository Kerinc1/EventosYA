import React, { useState, useEffect } from 'react';
import { getEvents, deleteEvent, createEvent, updateEvent } from '../api/api'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/EventAdmin.css'; 

const EventAdmin = () => {
  const [events, setEvents] = useState([]); // Estado para almacenar los eventos
  const [isEditing, setIsEditing] = useState(false); // Estado para determinar si se está editando un evento
  const [eventToEdit, setEventToEdit] = useState(null); // Estado para el evento que se está editando
  const [image, setImage] = useState(null); // Estado para la imagen seleccionada
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Por favor, inicia sesión');
        navigate('/login');
        return;
      }
      const response = await getEvents(token);
      setEvents(response.data);
    };
    fetchEvents();
  }, [navigate]);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteEvent(eventId, token);
      setEvents(events.filter(event => event._id !== eventId)); // Actualizar el estado después de eliminar
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No se seleccionó ninguna imagen.");
      return;
    }
    setImage(file); // Guardar la imagen seleccionada en el estado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('description', newEvent.description);
    formData.append('date', newEvent.date);
    formData.append('location', newEvent.location);
    formData.append('image', image); // Añadir imagen al FormData
    
    const token = localStorage.getItem('token');

    try {
      if (isEditing) {
        if (!eventToEdit || !eventToEdit._id) {
          console.error("No hay un ID de evento válido para actualizar.");
          return;
        }

        console.log("Event ID enviado a updateEvent:", eventToEdit._id);
        await updateEvent(formData, token, eventToEdit._id);
      } else {
        await createEvent(formData, token);
      }
      
      setIsEditing(false);
      setNewEvent({ title: '', description: '', date: '', location: '' });
      setImage(null);
      setEventToEdit(null);
      const response = await getEvents(token);
      setEvents(response.data); // Recargar eventos después de crear/actualizar
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    }
};

const handleEdit = (event) => {
    setIsEditing(true);
    setEventToEdit(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
    });
    setImage(null); // Limpiar la imagen para asegurarse de que se seleccione una nueva si es necesario
};


  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewEvent({ title: '', description: '', date: '', location: '' });
    setEventToEdit(null);
    setImage(null); // Limpiar la imagen
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestionar Eventos</h2>

      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">{isEditing ? 'Editar Evento' : 'Crear Evento'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ubicación</label>
                  <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                    required={!isEditing} // La imagen es obligatoria solo al crear
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">{isEditing ? 'Actualizar' : 'Crear'}</button>
                {isEditing && <button type="button" onClick={handleCancelEdit} className="btn btn-secondary w-100 mt-2">Cancelar</button>}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center">Eventos</h3>
        {events.length > 0 ? (
          <div className="events-list">
            {events.map(event => (
              <div key={event._id} className="event-card">
                <div className="event-details-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="event-details-info">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p><strong>Fecha:</strong> {new Date(event.date).toLocaleString()}</p>
                  <p><strong>Ubicación:</strong> {event.location}</p>
                  <button className="btn btn-warning" onClick={() => handleEdit(event)}>Editar</button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(event._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No se encontraron eventos.</p>
        )}
      </div>
    </div>
  );
};

export default EventAdmin;
