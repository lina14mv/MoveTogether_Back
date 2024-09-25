const mongoose = require("mongoose");
const Usuario = require("../../modelos/usuarios"); // Asegúrate de la ruta correcta

exports.obtenerPublicaciones = async (req, res) => {
  const { userId } = req.params;

  // Validar si el userId es un ObjectId válido
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "ID de usuario no válido." });
  }

  // Buscar al usuario por ID
  const usuario = await Usuario.findById(userId).select("publicaciones");
  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado." });
  }

  // Retornar las publicaciones del usuario
  return res.status(200).json(usuario.publicaciones);
};
