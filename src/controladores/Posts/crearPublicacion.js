const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post");
const mongoose = require("mongoose");

// Controlador para crear una nueva publicación
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Verificar que se haya proporcionado contenido o imagen
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

    // Validar si el autor es un ObjectId válido
    if (!mongoose.isValidObjectId(author)) {
      return res.status(400).json({ message: "ID de autor no válido." });
    }

    // Verificar que el usuario exista
    const usuario = await Usuario.findById(author);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Crear un nuevo post
    const newPost = new Post({
      title, // Asegúrate de que el título se guarde en la base de datos
      content,
      author,
      image: req.files && req.files.length > 0 ? req.files[0].path : null, // Si hay imagen, se guarda
      date: new Date(),
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
