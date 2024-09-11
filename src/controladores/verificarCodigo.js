const Usuario = require('../modelos/usuarios');

const verificarCodigoController = async (req, res) => {
  const { codigo } = req.body;

  try {
    // Buscar al usuario por el código de verificación
    const usuario = await Usuario.findOne({ codigoVerificacion: codigo });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Código de verificación incorrecto o usuario no encontrado' });
    }

    // Actualizar el estado del usuario
    usuario.codigoVerificacion = null;
    usuario.verificado = true;
    usuario.activo = true; // Activar el usuario tras la verificación
    await usuario.save();

    return res.json({ mensaje: 'Código verificado exitosamente. Registro completado.' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error del servidor', error });
  }
};

module.exports = verificarCodigoController;