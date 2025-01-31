import React, { useEffect, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { getAllEvents } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getAllEvents(token);
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const img = document.querySelector('.img-home');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const moveX = ((clientX / innerWidth) - 0.5) * 30; // Controlar la amplitud del movimiento
      const moveY = ((clientY / innerHeight) - 0.5) * 30;
      img.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="mt-5">
        <h2 className="mb-3">Eventos Destacados</h2>
        <Carousel
          nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: 'grey' }} />}
          prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: 'grey' }} />}
        >
          {events.map((event) => (
            <Carousel.Item key={event._id}>
              <img
                className="d-block w-100"
                src={event.image}
                alt={event.title}
              />
              <Carousel.Caption>
                <h3>{event.title}</h3>

                <p><strong>Fecha:</strong> {new Date(event.date).toLocaleString()}</p>
                <p><strong>Ubicación:</strong> {event.location}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <div className="div-img-home">
        <img src="HOME.png" alt="inicio" className="img-home" />
      </div>
      
      <footer className="footer mt-5">
        <p>© 2025 Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Home;
