// src/components/Events.jsx
import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAllEvents();
      setEvents(response.data);
    };

    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm) ||
    event.description.toLowerCase().includes(searchTerm) ||
    event.location.toLowerCase().includes(searchTerm) ||
    new Date(event.date).toLocaleString().toLowerCase().includes(searchTerm)
  );

  // Calcular los eventos actuales
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="events-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar eventos por título, descripción, ubicación o fecha..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="events-list">
        {currentEvents.map((event) => (
          <div
            key={event._id}
            className="event-card"
            onClick={() => navigate(`/events/${event._id}`)}
            style={{ cursor: 'pointer' }} 
          >
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>FECHA: {new Date(event.date).toLocaleString()}</p>
              <p>LUGAR: {event.location}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Events;
