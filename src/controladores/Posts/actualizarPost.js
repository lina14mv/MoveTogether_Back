const Post = require("../../modelos/post"); // Asegúrate de que la ruta al modelo sea correcta
const mongoose = require("mongoose");

const actualizarPublicacion = async (req, res) => {
  const { post_id } = req.params;
  const { titulo, contenido, imagen } = req.body;

  // Validar ID de la publicación
  if (!mongoose.isValidObjectId(post_id)) {
    return res.status(400).json({ message: "ID de publicación inválido." });
  }

  try {
    // Buscar la publicación
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    // Actualizar los campos
    if (titulo) post.titulo = titulo;
    if (contenido) post.contenido = contenido;
    if (imagen) post.imagen = imagen;

    // Guardar cambios
    await post.save();

    return res.status(200).json({ message: "Publicación actualizada.", post });
  } catch (error) {
    console.error("Error al actualizar la publicación:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = actualizarPublicacion;
