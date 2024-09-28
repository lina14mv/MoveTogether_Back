const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post");
const mongoose = require("mongoose");

// Controlador para crear una nueva publicación
exports.createPost = async (req, res) => {
  try {
    const { content, author } = req.body;

    // Verificar que al menos haya contenido o una imagen
    if (!content && (!req.files || req.files.length === 0)) {
      return res
        .status(400)
        .json({ message: "Se requiere contenido o una imagen para la publicación." });
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
      content,
      author,
      image: req.files && req.files.length > 0 ? req.files[0].path : null,
      date: new Date()
    });

    // Guardar el post en la base de datos
    await newPost.save();

    // Devolver la respuesta con el post creado
    return res.status(201).json({ message: "Publicación creada con éxito.", post: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear la publicación." });
  }
};