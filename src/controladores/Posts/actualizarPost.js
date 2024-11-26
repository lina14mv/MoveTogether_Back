const Post = require("../../modelos/post");
const mongoose = require("mongoose");

const actualizarPublicacion = async (req, res) => {
  const { post_id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.isValidObjectId(post_id)) {
    return res.status(400).json({ message: "ID de publicación inválido." });
  }

  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    console.log("Cuerpo de la solicitud: ", req.body);
    console.log("Archivo recibido: ", req.file);

    let updated = false;

    if (title !== undefined && title !== post.title) {
      post.title = title;
      updated = true;
    }

    if (content !== undefined && content !== post.content) {
      post.content = content;
      updated = true;
    }

    if (req.file && req.file.path !== post.image) {
      post.image = req.file.path;
      updated = true;
    }

    if (!updated) {
      return res
        .status(400)
        .json({ message: "No se realizaron cambios en la publicación." });
    }

    try {
      await post.save();
      console.log("Publicación después de guardar: ", post);
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
      return res
        .status(500)
        .json({ message: "Error al guardar la publicación." });
    }

    return res.status(200).json({ message: "Publicación actualizada.", post });
  } catch (error) {
    console.error("Error al actualizar la publicación:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = actualizarPublicacion;
