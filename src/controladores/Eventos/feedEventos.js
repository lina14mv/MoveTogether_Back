const mongoose = require("mongoose");
const Usuario = require("../../modelos/usuarios");
const Evento = require("../../modelos/evento");

exports.obtenerFeedEventos = async (req, res) => {
  const userId = req.user.id;

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
        message: "No tienes amigos. Haz nuevos amigos para ver eventos en tu feed.",
      });
    }

    // Obtener los IDs de los amigos del usuario
    const amigosIds = usuario.friends.map(amigo => amigo._id);

    // Buscar los eventos de los amigos en el modelo Evento
    const eventosFeed = await Evento.find({ organizer: { $in: amigosIds } }).populate('organizer', 'fullname avatar username');

    // Verificar si hay eventos en el feed
    if (eventosFeed.length === 0) {
      return res.status(200).json({
        message: "Aún no hay eventos de tus amigos.",
      });
    }

    // Retornar los eventos de los amigos
    return res.status(200).json(eventosFeed);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el feed de eventos." });
  }
};