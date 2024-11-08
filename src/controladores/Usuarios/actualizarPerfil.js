const Usuario = require("../../modelos/usuarios");

// Actualizar perfil del usuario por correo electrónico
const updateUserProfileByEmail = async (req, res) => {
  try {
    const { email } = req.user; // Obtener el correo electrónico del token decodificado
    const updates = req.body; // Datos a actualizar

    // Excluir los campos amigos y publicaciones de la actualización
    const allowedUpdates = [
      "fullname",
      "username",
      "password",
      "phoneNumber",
      "birthday",
      "gender",
      "avatar",
      "sports",
      "ubi",
    ];
    const updateKeys = Object.keys(updates);

    // Verificar que solo se estén actualizando campos permitidos
    const isValidOperation = updateKeys.every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isValidOperation) {
      return res
        .status(400)
        .json({ message: "Operación de actualización inválida" });
    }

    // Actualizar el usuario usando el correo electrónico
    const usuario = await Usuario.findOneAndUpdate({ email }, updates, {
      new: true,
      runValidators: true,
    })
      .select("-password -createdAt -updatedAt -posts -verificationCode -verifiedStatus -conversations -unreadMessages ") // Excluir la contraseña en la respuesta
      .exec();

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      usuario,
      message: "Perfil de usuario actualizado exitosamente"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el perfil del usuario", error });
  }
};

module.exports = {
  updateUserProfileByEmail,
};
