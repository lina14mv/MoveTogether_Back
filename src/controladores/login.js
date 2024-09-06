const { validationResult } = require("express-validator");
const Login = require('../../src/modelos/usuarios.js');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "El email y la contraseña son requeridos" });
  }

  try {
    const usuario = await Login.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (!usuario.verificado) {
      return res.status(403).json({ message: "Debe verificar su correo electrónico antes de iniciar sesión" });
    }
    if (!usuario.activo) {
      return res.status(403).json({ message: "Usuario no activo. Contacte al soporte" });
    }

    // Comparar contraseñas
    if (password !== usuario.password) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar el código de acceso temporal (OTP)
    const codigoAcceso = crypto.randomBytes(3).toString('hex'); // Código de 6 caracteres
    usuario.codigoLogin = codigoAcceso;
    await usuario.save(); // Guarda el código en la base de datos

    // Configuración del correo para enviar el código de acceso
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: usuario.email,
      subject: 'Código de Acceso para Iniciar Sesión',
      text: `Hola ${usuario.nombre},\n\nTu código de acceso para iniciar sesión es: ${codigoAcceso}\n\nSi no solicitaste este código, por favor ignora este correo.`,
    };

    // Enviar el correo con el código de acceso
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado con éxito a:", usuario.email);

    // Responder con un mensaje de éxito
    res.status(200).json({ message: "Revisa tu correo para el código de acceso." });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Ocurrió un error al iniciar sesión" });
  }
};

module.exports = loginController;
