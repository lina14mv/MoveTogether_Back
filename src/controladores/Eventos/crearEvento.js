const Evento = require("../../modelos/evento");
const Comunidad = require("../../modelos/comunidades");
const mongoose = require("mongoose");

// Controlador para crear un nuevo evento
exports.crearEvento = async (req, res) => {
  try {
    const { title, date, time, destination, comunidadId } = req.body;
    const organizer = req.user.id; // Obtener el ID del organizador desde req.user

    // Verificar si el evento está asociado a una comunidad
    if (comunidadId) {
      const comunidad = await Comunidad.findById(comunidadId);
      if (!comunidad) {
        return res.status(404).json({ message: "Comunidad no encontrada." });
      }

      // Verificar que el usuario sea un miembro de la comunidad
      const esMiembro = comunidad.miembros.includes(organizer);
      if (!esMiembro) {
        return res.status(403).json({ message: "No tienes permiso para crear un evento en esta comunidad." });
      }
    }

    // Crear un nuevo evento
    const newEvento = new Evento({
      title,
      date,
      time,
      destination,
      organizer,
      comunidad: comunidadId || null, // Asociar con la comunidad si se proporciona
    });

    // Guardar el evento en la base de datos
    await newEvento.save();

    // Devolver la respuesta con el evento creado
    return res
      .status(201)
      .json({ message: "Evento creado con éxito.", evento: newEvento });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el evento." });
  }
};