const Post = require("../../modelos/post");
const Comunidad = require("../../modelos/comunidades");
const mongoose = require("mongoose");

// Controlador para crear una nueva publicación
exports.createPost = async (req, res) => {
  try {
    const { content, image, comunidadId } = req.body;
    const author = req.user.id; // Obtener el ID del autor desde req.user

    // Verificar que al menos haya contenido o una imagen
    if (!content && !image) {
      return res
        .status(400)
        .json({message: "Se requiere contenido o una imagen para la publicación."});
    }

    // Verificar si la publicación está asociada a una comunidad
    if (comunidadId) {
      const comunidad = await Comunidad.findById(comunidadId);
      if (!comunidad) {
        return res.status(404).json({ message: "Comunidad no encontrada." });
      }

      // Verificar que el usuario sea un miembro de la comunidad
      const esMiembro = comunidad.miembros.includes(author);
      if (!esMiembro) {
        return res.status(403).json({ message: "No tienes permiso para crear una publicación en esta comunidad." });
      }
    }

    // Crear un nuevo post
    const newPost = new Post({
      content,
      author,
      image,
      comunidad: comunidadId || null, // Asociar con la comunidad si se proporciona
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