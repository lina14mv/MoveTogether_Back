const Post = require("../../modelos/post"); // Asegúrate de que la ruta al modelo sea correcta
const mongoose = require("mongoose");

const actualizarPublicacion = async (req, res) => {
  const { post_id } = req.params;
  const { title, content, image } = req.body;

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
    if (title) post.title = title;
    if (content) post.content = content;
    if (image) post.image = image;

    // Guardar cambios
    await post.save();

    return res.status(200).json({ message: "Publicación actualizada.", post });
  } catch (error) {
    console.error("Error al actualizar la publicación:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = actualizarPublicacion;
