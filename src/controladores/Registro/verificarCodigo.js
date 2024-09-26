const Usuario = require("../../modelos/usuarios");

const verificarCodigoController = async (req, res) => {
  const { code } = req.body;

  try {
    // Buscar al usuario por el código de verificación
    const usuario = await Usuario.findOne({ verificationCode: code });

    if (!usuario) {
      return res
        .status(404)
        .json({
          mensaje: "Código de verificación incorrecto o usuario no encontrado",
        });
    }

    // Actualizar el estado del usuario
    usuario.verificationCode = null;
    usuario.verifiedStatus = true;
    usuario.status = true; // Activar el usuario tras la verificación
    await usuario.save();

    return res.json({
      mensaje: "Código verificado exitosamente. Registro completado.",
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error });
  }
};

module.exports = verificarCodigoController;
