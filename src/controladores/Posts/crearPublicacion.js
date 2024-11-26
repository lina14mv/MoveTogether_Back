const Post = require("../../modelos/post");
const mongoose = require("mongoose");

// Controlador para crear una nueva publicación
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const author = req.user.id; // Obtener el ID del autor desde req.user

    // Verificar que al menos haya contenido o una imagen
    if (!content && !image) {
      return res
        .status(400)
        .json({message: "Se requiere contenido o una imagen para la publicación."});
    }

    // Crear un nuevo post
    const newPost = new Post({
      content,
      author,
      image,
    });

    // Guardar el post en la base de datos
    await newPost.save();

    // Devolver la respuesta con el post creado
    return res
      .status(201)
      .json({ message: "Publicación creada con éxito.", post: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear la publicación." });
  }
};
