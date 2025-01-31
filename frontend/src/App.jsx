import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importar el AuthProvider
import NavigationBar from './components/Navbar.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import Home from './components/Home.jsx'; 
import Events from './components/Events.jsx'; 
import EventAdmin from './components/EventAdmin';
import EventDetails from './components/EventDetails';
import About from './components/About';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <AuthProvider> {/* Envolver el router con AuthProvider */}
      <Router>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/admin/events" element={<EventAdmin />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
