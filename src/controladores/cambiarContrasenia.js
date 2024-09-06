const express = require('express');
const Usuario = require('../../src/modelos/usuarios');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/cambiar-contrasenia', async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const codigoCambio = crypto.randomBytes(3).toString('hex');
    usuario.codigoCambioContrasena = codigoCambio;
    await usuario.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: usuario.email,
      subject: 'Código de Cambio de Contraseña',
      text: `Hola ${usuario.nombre},\n\nTu código para cambiar la contraseña es: ${codigoCambio}\n\nSi no solicitaste este cambio, por favor ignora este correo.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ mensaje: 'Código de cambio de contraseña enviado a tu correo.' });
  } catch (error) {
    console.error('Error al solicitar cambio de contraseña:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al solicitar el cambio de contraseña' });
  }
});

module.exports = router;
