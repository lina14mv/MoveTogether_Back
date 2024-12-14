const Comunidad = require("../../modelos/comunidades");
const Post = require("../../modelos/post");
const Evento = require("../../modelos/evento");
const Usuario = require("../../modelos/usuarios");

const verComunidad = async (req, res) => {
  try {
    const comunidadId = req.params.comunidadId;

    // Recuperar la comunidad
    const comunidad = await Comunidad.findById(comunidadId)
      .populate("miembros", "nombre email") // Ajusta los campos según tu modelo de Usuario
      .populate("posts")
      .populate("eventos");

    if (!comunidad) {
      return res.status(404).json({ message: "Comunidad no encontrada." });
    }

    // Recuperar publicaciones asociadas a la comunidad
    const publicaciones = await Post.find({ comunidad: comunidadId });

    // Recuperar eventos asociados a la comunidad
    const eventos = await Evento.find({ comunidad: comunidadId });

    // Recuperar la lista de miembros de la comunidad
    const miembros = await Usuario.find({ _id: { $in: comunidad.miembros } });

    // Enviar la respuesta con toda la información
    return res.status(200).json({
      comunidad,
      publicaciones,
      eventos,
      miembros,
      cantidadMiembros: miembros.length,
    });
  } catch (error) {
    console.error("Error al recuperar la información de la comunidad:", error);
    return res.status(500).json({ message: "Error del servidor.", error: error.message });
  }
};

module.exports = verComunidad;