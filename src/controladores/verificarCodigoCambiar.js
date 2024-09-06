const Usuario = require('../modelos/usuarios');

const verificarCodigoCambiarController = async (req) => {
  const { email, codigo, nuevaContrasenia } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (usuario.codigoCambioContrasena !== codigo) {
      throw new Error('Código incorrecto');
    }

    // Validar el formato de la nueva contraseña directamente en el controlador
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*+?&])[A-Za-z\d@$!%*+?&]{8,}$/;
    if (!passwordRegex.test(nuevaContrasenia)) {
      throw new Error('La nueva contraseña no cumple con el formato requerido.');
    }

    usuario.password = nuevaContrasenia;
    usuario.codigoCambioContrasena = null; // Limpiar el código temporal

    await usuario.save();

    return { success: true};
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = verificarCodigoCambiarController;
