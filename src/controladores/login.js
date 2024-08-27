const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Login = require('../modelos/usuarios'); 

const loginController = async (req, res) => {
    // Verifica si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    console.log("Buscando usuario:", email);

    // Busca al usuario en la base de datos por su email
    const usuario = await Login.findOne({ email });

    // Si el usuario no se encuentra, responde con un error
    if (!usuario) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Compara la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      console.log("Contraseña incorrecta");
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Si las credenciales son correctas, responde con un mensaje de éxito y los datos del usuario
    console.log("Usuario encontrado:", usuario);
    return res.status(200).json({ success: true, usuario });
  } catch (error) {
    // Si ocurre un error en el servidor, responde con un mensaje de error
    console.error("Error del servidor:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = loginController;