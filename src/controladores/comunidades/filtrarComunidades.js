const Comunidad = require("../../modelos/comunidades");

exports.filtrarComunidades = async (req, res) => {
  const { categoria } = req.body;

  if (!categoria) {
    return res.status(400).json({ message: "La categoría es requerida." });
  }

  try {
    // Buscar comunidades que contengan la categoría especificada
    const comunidades = await Comunidad.find({ categorias: categoria });

    if (comunidades.length === 0) {
      return res.status(404).json({ message: "No se encontraron comunidades para la categoría especificada." });
    }

    // Devolver las comunidades encontradas
    return res.status(200).json({ comunidades });
  } catch (error) {
    console.error("Error al filtrar comunidades:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};