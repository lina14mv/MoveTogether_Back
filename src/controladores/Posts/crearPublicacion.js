const Post = require("../../modelos/post");
const Usuario = require("../../modelos/usuarios");
const mongoose = require("mongoose");

// Controlador para crear una nueva publicación
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Verificar que los campos obligatorios estén presentes
    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: "Título, contenido y autor son requeridos." });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Se requiere una imagen para la publicación." });
    }
    // Validar si el autor es un ObjectId válido
    if (!mongoose.isValidObjectId(author)) {
      return res.status(400).json({ message: "ID de autor no válido." });
    }

    // Verificar si el autor (usuario) existe
    const usuario = await Usuario.findById(author);
    if (!usuario) {
      return res.status(404).json({ message: "El autor no existe." });
    }

    // Verificar si se ha subido un archivo
    let image = null;
    if (req.files && req.files.length > 0) {
      // Acceder al primer archivo subido (si hay más, accede a los que necesites)
      const uploadedFile = req.files[0];
      image = `/uploads/post_images/${uploadedFile.filename}`; // Ruta donde se almacena la imagen del post
    }

    // Crear una nueva publicación
    const newPost = new Post({
      title,
      content,
      author,
      image,
    });

    // Guardar la publicación en la base de datos
    const savedPost = await newPost.save();

    // Agregar la publicación al campo `publicaciones` del usuario
    usuario.publicaciones.push({
      titulo: savedPost.title,
      contenido: savedPost.content,
      imagen: savedPost.image,
    });
    await usuario.save(); // Guardar el usuario con la nueva publicación

    // Responder con el post creado
    return res.status(201).json({
      message: "Publicación creada con éxito.",
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear la publicación." });
  }
};
