const mongoose = require("mongoose");
const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post");

exports.obtenerPublicaciones = async (req, res) => {
  const userId = req.user.id; // Obtener el ID del usuario autenticado

  // Validar si el userId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID de usuario no válido." });
  }

  try {
    // Buscar publicaciones del usuario
    const publicaciones = await Post.find({ author: userId }).populate("author", "fullname avatar username");

    // Devolver las publicaciones encontradas
    return res.status(200).json({ publicaciones });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener las publicaciones." });
  }
};