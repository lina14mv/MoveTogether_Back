const express = require('express');
const Usuario = require('../../src/modelos/usuarios');
const router = express.Router();

// Ruta para verificar el código de verificación
router.post('/verificar-codigo', async (req, res) => {
  const { email, codigo } = req.body;

  try {
    // Buscar al usuario por el email
    const usuario = await Usuario.findOne({ email });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar si el código ingresado es correcto
    if (usuario.codigoVerificacion === codigo) {
      // El código es correcto, actualizar el estado del usuario
      usuario.codigoVerificacion = null; // Limpiar el código
      usuario.verificado = true; // Marcar al usuario como verificado
      await usuario.save();

      res.json({ mensaje: 'Código verificado exitosamente. Registro completado.' });
    } else {
      res.status(400).json({ mensaje: 'Código de verificación incorrecto' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error });
  }
});

module.exports = router;
