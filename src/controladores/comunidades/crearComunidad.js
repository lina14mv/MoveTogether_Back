const Comunidad = require("../../modelos/comunidades");

const crearComunidad = async (req, res) => {
  const { nombre, descripcion, categorias, imagenPerfil } = req.body;
  const administradorId = req.user.id; // Obtiene el ID del usuario desde el token JWT

  // Validar campos obligatorios
  if (!nombre || !descripcion || !administradorId) {
    return res.status(400).json({
      message: "Nombre, descripción y administrador son obligatorios.",
    });
  }

  // Validación de longitudes
  if (nombre.length < 3 || nombre.length > 50) {
    return res.status(400).json({
      message: "El nombre de la comunidad debe tener entre 3 y 50 caracteres.",
    });
  }

  if (descripcion.length < 10 || descripcion.length > 200) {
    return res.status(400).json({
      message: "La descripción debe tener entre 10 y 200 caracteres.",
    });
  }

  const categoriasValidas = [
    "bicicleta",
    "fútbol",
    "running",
    "tenis",
    "baloncesto",
  ];
  if (categorias && categorias.length > 0) {
    for (let categoria of categorias) {
      if (!categoriasValidas.includes(categoria)) {
        return res.status(400).json({
          message: `La categoría "${categoria}" no es válida.`,
        });
      }
    }

    // Asegurarse de que las categorías no se repitan
    if (new Set(categorias).size !== categorias.length) {
      return res.status(400).json({
        message: "Las categorías no pueden repetirse.",
      });
    }
  }

  try {
    // Verificar si el nombre de la comunidad ya existe
    const comunidadExistente = await Comunidad.findOne({ nombre });
    if (comunidadExistente) {
      return res
        .status(400)
        .json({ message: "Ya existe una comunidad con este nombre." });
    }

    // Crear la nueva comunidad
    const nuevaComunidad = new Comunidad({
      nombre,
      descripcion,
      miembros: [administradorId],
      categorias: categorias || [], // Asignar categorías si se proporcionan
      imagenPerfil: imagenPerfil || "", // Imagen opcional
    });

    // Guardar la comunidad en la base de datos
    await nuevaComunidad.save();

    // Respuesta exitosa
    return res.status(201).json({
      message: "Comunidad creada exitosamente",
      comunidad: nuevaComunidad,
    });
  } catch (error) {
    console.error("Error al crear la comunidad:", error);
    return res
      .status(500)
      .json({ message: "Error del servidor al crear la comunidad." });
  }
};

module.exports = crearComunidad;
