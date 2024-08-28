const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Login = require("../modelos/usuarios");

const loginController = async (req, res) => {
  // Verifica si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("Buscando usuario:", email);

    // Busca al usuario en la base de datos por su email
    const usuario = await Login.findOne({ email });

    // Si el usuario no se encuentra, responde con un error
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verifica la contraseña
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña almacenada (hash):", usuario.password);

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Si todo está bien, responde con éxito
    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = loginController;
