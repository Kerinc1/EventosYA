import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import '../styles/Form.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Nuevo estado para el email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password }); 
      setError('');
      // Mostrar la alerta de éxito
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Te has registrado correctamente. Por favor, inicia sesión.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate('/login'); // Redirigir a la página de login después de cerrar la alerta
      });
    } catch (err) {
      // Verificar errores específicos, por ejemplo, formato del email
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al conectar con el servidor');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-3">Registro de Usuario</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUsername">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introducir Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail"> {/* Nuevo campo de email */}
          <Form.Label>Correo Electronico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introducir Correo Electronico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Registerme
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
