const Usuario = require("../../modelos/usuarios");

// Obtener perfil del usuario por correo electrónico
const getUserProfileByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ message: "El correo electrónico es obligatorio" });
    }

    // Buscar el usuario por correo electrónico
    const usuario = await Usuario.findOne({ email })
      .select("-password -verificationCode -changePassCode  -createdAt -updatedAt -verifiedStatus") // Excluir la contraseña
      .populate("friends", "nombre email")
      .exec();

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el perfil del usuario", error });
  }
};

module.exports = {
  getUserProfileByEmail,
};
