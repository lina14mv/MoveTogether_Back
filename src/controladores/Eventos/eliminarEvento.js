const Usuario = require("../../modelos/usuarios");
const Evento = require("../../modelos/evento"); // Asegúrate de ajustar la ruta si es necesario
const mongoose = require("mongoose");

const eliminarEvento = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const userId = req.user.id;

    // Verifica que el eventoId sea válido
    if (!mongoose.isValidObjectId(eventoId)) {
      return res.status(400).json({ message: "ID de evento inválido." });
    }

    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado." });
    }

    // Verifica que el usuario sea el organizador del evento
    if (evento.organizer.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este evento." });
    }

    // Elimina el evento
    await evento.deleteOne();

    // Elimina la referencia del evento en el modelo de Usuario
    const result = await Usuario.updateMany(
      { eventos: eventoId }, // Filtra los usuarios que tienen el evento
      { $pull: { eventos: eventoId } } // Elimina el evento del array
    );

    if (result.nModified === 0) {
      console.log(
        `No se encontró la referencia del evento en ningún usuario.`
      );
      return res.status(404).json({
        message:
          "Referencia del evento no encontrada en ningún usuario.",
      });
    }

    console.log(`Evento y referencia eliminadas con éxito.`);
    return res
      .status(200)
      .json({ message: "Evento y referencia eliminadas con éxito." });
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = eliminarEvento;