const Login = require("../../modelos/usuarios");

const cambiarContrasenaController = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Busca al usuario en la base de datos por su email
    const usuario = await Login.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Verifica que la contraseña anterior coincida
    if (oldPassword !== usuario.password) {
      console.log(`Contraseña antigua incorrecta: ${oldPassword}`);
      return res.status(400).json({ mensaje: "Contraseña antigua incorrecta" });
    }

    // Guarda la nueva contraseña en la base de datos
    usuario.password = newPassword;
    await usuario.save();

    // Imprime la nueva contraseña
    console.log(`Nueva contraseña guardada: ${newPassword}`);

    return res
      .status(200)
      .json({ mensaje: "Contraseña cambiada exitosamente" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor" });
  }
};

module.exports = cambiarContrasenaController;
