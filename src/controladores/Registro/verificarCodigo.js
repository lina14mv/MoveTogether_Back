const Usuario = require("../../modelos/usuarios");
const jwt = require("jsonwebtoken");

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
    usuario.isLoggedIn = true; // Iniciar sesión automáticamente tras la verificación
    await usuario.save();

    //Token
    const payload = {
      id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      username: usuario.username,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      mensaje: "Código verificado exitosamente. Registro completado.",
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error });
  }
};

module.exports = verificarCodigoController;
