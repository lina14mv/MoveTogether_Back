const Post = require("../../modelos/post");
const Usuario = require("../../modelos/usuarios");
const mongoose = require("mongoose");

exports.obtenerFeed = async (req, res) => {
  const { userId } = req.params;

  // Validar si el userId es un ObjectId válido
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "ID de usuario no válido." });
  }

  // Buscar al usuario por ID
  const usuario = await Usuario.findById(userId).populate(
    "amigos",
    "publicaciones"
  ); // Obtener amigos con sus publicaciones
  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado." });
  }

  // Crear un array para almacenar todas las publicaciones de los amigos
  const publicacionesFeed = [];

  // Recorrer amigos y agregar sus publicaciones al feed
  for (const amigo of usuario.amigos) {
    publicacionesFeed.push(...amigo.publicaciones); // Agrega las publicaciones del amigo al feed
  }

  if (publicacionesFeed.length === 0) {
    return res.status(200).json({
      message:
        "No tienes amigos. Haz nuevos amigos para ver publicaciones en tu feed.",
    });
  }

  // Retornar el feed de publicaciones
  return res.status(200).json(publicacionesFeed);
};
