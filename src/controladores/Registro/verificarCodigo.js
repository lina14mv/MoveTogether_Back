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

 
    // Generar el token JWT
    const payload = {
      id: usuario._id,
      name: usuario.fullname,
      email: usuario.email,
      phoneNumber: usuario.phoneNumber,
      avatar: usuario.avatar,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    console.log("Token generado:", token);

    return res.json({
      mensaje: "Código verificado exitosamente. Registro completado.", 
      token: token,
    });
  } catch (error) {
    console.error(error); // Esto imprimirá el error completo en la consola para que puedas verlo
    return res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
  
};

module.exports = verificarCodigoController;
