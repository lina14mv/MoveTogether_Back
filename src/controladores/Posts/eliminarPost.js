const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post"); // Asegúrate de ajustar la ruta si es necesario
const mongoose = require("mongoose");

const eliminarPublicacion = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    // Verifica que el post_id sea válido
    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({ message: "ID de publicación inválido." });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    // Verifica que el usuario sea el propietario de la publicación
    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar esta publicación." });
    }

    // Elimina la publicación
    await post.deleteOne();

    // Elimina la referencia de la publicación en el modelo de Usuario
    const result = await Usuario.updateMany(
      { publicaciones: postId }, // Filtra los usuarios que tienen la publicación
      { $pull: { publicaciones: postId } } // Elimina la publicación del array
    );

    if (result.nModified === 0) {
      console.log(
        `No se encontró la referencia de la publicación en ningún usuario.`
      );
      return res.status(404).json({
        message:
          "Referencia de la publicación no encontrada en ningún usuario.",
      });
    }

    console.log(`Publicación y referencia eliminadas con éxito.`);
    return res
      .status(200)
      .json({ message: "Publicación y referencia eliminadas con éxito." });
  } catch (error) {
    console.error("Error al eliminar la publicación:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = eliminarPublicacion;
