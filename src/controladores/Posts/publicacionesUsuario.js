const mongoose = require("mongoose");
const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post");

exports.obtenerPublicaciones = async (req, res) => {
  const { userId } = req.params;

  // Validar si el userId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID de usuario no válido." });
  }

  try {
    // Buscar al usuario por ID
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Buscar las publicaciones del usuario en el modelo Post
    const publicaciones = await Post.find({ author: userId });

    // Verificar si el usuario tiene publicaciones
    if (publicaciones.length === 0) {
      return res.status(200).json({ message: "Aún no publicas nada." });
    }

    // Retornar las publicaciones del usuario
    return res.status(200).json(publicaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener las publicaciones." });
  }
};