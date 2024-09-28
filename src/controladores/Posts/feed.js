const mongoose = require("mongoose");
const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post");

exports.obtenerFeed = async (req, res) => {
  const { userId } = req.params;

  // Validar si el userId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID de usuario no válido." });
  }

  try {
    // Buscar al usuario por ID
    const usuario = await Usuario.findById(userId).populate("friends", "_id");
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar si el usuario tiene amigos
    if (usuario.friends.length === 0) {
      return res.status(200).json({
        message: "No tienes amigos. Haz nuevos amigos para ver publicaciones en tu feed.",
      });
    }

    // Obtener los IDs de los amigos del usuario
    const amigosIds = usuario.friends.map(amigo => amigo._id);

    // Buscar las publicaciones de los amigos en el modelo Post
    const publicacionesFeed = await Post.find({ author: { $in: amigosIds } });

    // Verificar si hay publicaciones en el feed
    if (publicacionesFeed.length === 0) {
      return res.status(200).json({
        message: "Aún no hay publicaciones de tus amigos.",
      });
    }

    // Retornar las publicaciones de los amigos
    return res.status(200).json(publicacionesFeed);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el feed." });
  }
};