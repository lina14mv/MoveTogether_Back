const Post = require("../../modelos/post");
const mongoose = require("mongoose");

// Controlador para crear una nueva publicación
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const author = req.user.id; // Obtener el ID del autor desde req.user

    // Verificar que al menos haya contenido o una imagen
    if (!content && (!req.files || req.files.length === 0)) {
      return res
        .status(400)
        .json({
          message: "Se requiere contenido o una imagen para la publicación.",
        });
    }

    // Verificar que se haya proporcionado un título
    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio." });
    }

    // Crear un nuevo post
    const newPost = new Post({
      title, // Asegúrate de que el título se guarde en la base de datos
      content,
      author,
      image: req.files && req.files.length > 0 ? req.files[0].path : null,
      date: new Date()
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
