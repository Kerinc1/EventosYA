import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="navbar-logo" style={{ marginLeft: '3%' }}>
        <Link to="/">
          <img src="/logoEventos.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/events">Eventos</Link></li>
        <li><Link className="nav-link" to="/about">Acerca de Nosotros</Link></li>
      </ul>
      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            <button className="btn btn-primary" onClick={() => navigate('/admin/events')} style={{ marginRight: '1rem' }}>Mis Eventos</button>
            <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
          </>
        ) : location.pathname === '/login' ? (
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Registrarse</button>
        ) : location.pathname === '/register' ? (
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Iniciar Sesión</button>
        ) : (
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Iniciar Sesión</button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
