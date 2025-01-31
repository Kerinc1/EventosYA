import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación
import { loginUser } from '../api/api'; // Importar la función loginUser
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../styles/Form.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Usar el contexto de autenticación
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      
      // Verifica que la respuesta contiene el token
      console.log("Login exitoso:", response); // Muestra toda la respuesta para verificar que contiene el token

      if (response && response.token) {
        // Almacenar el token en el localStorage
        localStorage.setItem('token', response.token);
        login(response.token); // Actualizar el estado de autenticación en el contexto
        setError(''); // Limpiar el error si el login es exitoso
        navigate('/'); // Redirigir a la página principal
      } else {
        setError('Autenticación fallida: No se recibió un token');
      }
    } catch (err) {
      // Manejo de errores: verificar si la respuesta tiene más detalles
      console.error("Error al hacer login:", err); // Muestra el error para su diagnóstico
      if (err.response && err.response.status === 401) {
        setError('Nombre de usuario o contraseña incorrectos');
      } else {
        setError('Error al conectar con el servidor');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-3">Iniciar Sesión</h2>
      
      {error && <Alert variant="danger">{error}</Alert>} {/* Mostrar el error si existe */}
      
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introducir Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introducir Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" block style={{marginTop: '3%'}}>
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
