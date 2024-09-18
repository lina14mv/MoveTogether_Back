const { validationResult } = require("express-validator");
const Login = require("../../modelos/usuarios");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const usuario = await Login.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (password !== usuario.password) {
      //console.log("Contraseña almacenada en la BD:", usuario.password);
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Genera el token JWT
    const payload = {
      nombre: usuario.nombre,
      telefono: usuario.telefono,
      avatar: usuario.avatar,
      deporte: usuario.deporte,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log("Token generado:", token);

    // Responde con éxito y envía el token
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Ocurrió un error al iniciar sesión" });
  }
};

module.exports = loginController;
