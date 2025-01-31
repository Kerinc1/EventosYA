const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Middleware pre-guardado para realizar el hash del password antes de guardar el documento en la base de datos
userSchema.pre('save', async function (next) {
  // Si el password no ha sido modificado, pasa al siguiente middleware
  if (!this.isModified('password')) return next();
  // Realiza el hash de la contraseña con 10 rondas de sal
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar la contraseña introducida por el usuario con la contraseña almacenada en la base de datos
userSchema.methods.comparePassword = function (candidatePassword) {
  // Compara la contraseña candidata con la contraseña almacenada mediante bcrypt
  return bcrypt.compare(candidatePassword, this.password);
};

// Exporta el modelo de usuario para ser utilizado en otras partes de la aplicación
module.exports = mongoose.model('User', userSchema);
