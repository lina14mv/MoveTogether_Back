const express = require('express');
const Usuario = require('../modelos/usuarios');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/verificar-codigo-inicio', async (req, res) => {
  const { email, codigo } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.codigoLogin === codigo) {
      usuario.codigoLogin = null; // Limpiar el código después de verificarlo
      await usuario.save();

      // Generar el token JWT
      const payload = {
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        avatar: usuario.avatar,
        deportes: usuario.deportes,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      console.log("Token generado:", token);

      res.json({ 
        mensaje: 'Código verificado exitosamente. Has iniciado sesión.', 
        token: token });
    } else {
      res.status(400).json({ mensaje: 'Código de verificación incorrecto' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error });
  }
});

module.exports = router;
