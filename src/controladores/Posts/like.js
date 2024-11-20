const Post = require('../../modelos/post'); // Asegúrate de ajustar la ruta según tu estructura de proyecto

// Controlador para manejar "me gusta" en una publicación
const likePost = async (req, res) => {
  try {
    const postId = req.params.postId; // Asegúrate de usar el nombre correcto del parámetro
    const userId = req.user.id; // El ID del usuario autenticado

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Verificar si el usuario ya ha dado "me gusta" a la publicación
    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex !== -1) {
      // El usuario ya ha dado "me gusta", quitar el "me gusta"
      post.likes.splice(likeIndex, 1);
      await post.save();
      return res.status(200).json({ message: 'Me gusta eliminado', likes: post.likes });
    } else {
      // El usuario no ha dado "me gusta", agregar el "me gusta"
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: 'Me gusta agregado', likes: post.likes });
    }
  } catch (error) {
    console.error('Error al manejar "me gusta":', error);
    return res.status(500).json({ message: 'Error al manejar "me gusta"' });
  }
};

module.exports = likePost;