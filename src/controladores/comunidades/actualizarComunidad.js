const Comunidad = require("../../modelos/comunidades"); // Ajusta la ruta si es necesario
const Usuario = require("../../modelos/usuarios"); // Ajusta la ruta si es necesario

const actualizarComunidad = async (req, res) => {
  try {
    const comunidadId = req.params.comunidadId;
    const userId = req.user.id; // Asumiendo que el middleware de verificación de token agrega el ID del usuario a req.user
    const { descripcion, imagenPerfil, categorias } = req.body;

    // Verifica que la comunidad exista
    const comunidad = await Comunidad.findById(comunidadId);
    if (!comunidad) {
      return res.status(404).json({ message: "Comunidad no encontrada." });
    }

    // Verifica que el usuario sea un miembro de la comunidad
    const esMiembro = comunidad.miembros.includes(userId);

    if (!esMiembro) {
      return res.status(403).json({ message: "No tienes permiso para actualizar esta comunidad." });
    }

    // Actualiza la descripción si se proporciona
    if (descripcion !== undefined) {
      comunidad.descripcion = descripcion;
    }

    // Actualiza la imagen de perfil si se proporciona
    if (imagenPerfil !== undefined) {
      comunidad.imagenPerfil = imagenPerfil;
    }

    // Agrega nuevas categorías si se proporcionan
    if (categorias !== undefined && Array.isArray(categorias)) {
      comunidad.categorias.push(...categorias);
    }

    // Guarda los cambios
    await comunidad.save();

    return res.status(200).json({ message: "Comunidad actualizada con éxito.", comunidad });
  } catch (error) {
    console.error("Error al actualizar la comunidad:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = actualizarComunidad;