const Usuario = require("../../modelos/usuarios");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
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
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    if (!usuario.status) {
      return res.status(403).json({
        mensaje: "Cuenta no verificada. Por favor, verifica tu cuenta.",
      });
    }

    // Generar el token JWT
    const payload = {
      id: usuario._id,
      name: usuario.fullname,
      phoneNumber: usuario.phoneNumber,
      avatar: usuario.avatar,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    console.log("Token generado:", token);

    return res.json({
      mensaje: "Inicio de sesión exitoso",
      token: token,
    });

    // Responde con éxito y envía el token
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error });
  }
};

module.exports = loginController;
