const mongoose = require("mongoose");
const Evento = require("../../modelos/evento");

exports.obtenerEventos = async (req, res) => {
  const userId = req.user.id; // Obtener el ID del usuario autenticado

  // Validar si el userId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID de usuario no válido." });
  }

  try {
    console.log(`Buscando eventos para el usuario con ID: ${userId}`);

    // Buscar eventos del usuario
    const eventos = await Evento.find({ organizer: userId, comunidad: { $in: [null, undefined] } }).populate("organizer", "fullname avatar username");

    console.log(`Eventos encontrados: ${eventos.length}`);

    // Devolver los eventos encontrados
    return res.status(200).json({ eventos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los eventos." });
  }
};