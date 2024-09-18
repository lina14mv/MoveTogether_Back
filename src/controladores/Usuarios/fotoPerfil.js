const Usuario = require("../../modelos/usuarios");

const subirFotoPerfil = async (req, res) => {
  try {
    const email = req.params.email; // El correo electrónico viene de los parámetros de la URL
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha subido ninguna imagen" });
    }

    // Guardamos la ruta de la imagen en el campo "avatar" del usuario
    const filePath = `uploads/profile_pictures/${req.file.filename}`;
    usuario.avatar = filePath;

    // Guardamos el usuario actualizado
    await usuario.save();

    res.status(200).json({
      message: "Foto de perfil subida correctamente",
      avatar: filePath, // Devuelve la ruta de la imagen para confirmar
    });
  } catch (error) {
    console.error("Error al subir la foto de perfil:", error);
    res
      .status(500)
      .json({ message: "Error al subir la foto de perfil", error });
  }
};

module.exports = subirFotoPerfil;
