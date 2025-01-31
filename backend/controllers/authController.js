const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Asegurar que el nombre coincide con el archivo
const config = require('../config');

// Función para registrar usuario
const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('Usuario registrado');
  } catch (err) {
    res.status(500).send('Error al registrar usuario');
  }
};

// Función para login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Intento de login: ${username}`);

    const user = await User.findOne({ username });
    if (!user) {
      console.log(`Usuario no encontrado: ${username}`);
      return res.status(401).send('Autenticación fallida');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Contraseña incorrecta para el usuario: ${username}`);
      return res.status(401).send('Autenticación fallida');
    }

    const token = jwt.sign({ id: user._id, email: user.email }, config.secret, { expiresIn: config.tokenExpiration });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).send('Error en el inicio de sesión');
  }
};

// Exportar funciones para usarlas en authRoutes.js
module.exports = { register, login };
