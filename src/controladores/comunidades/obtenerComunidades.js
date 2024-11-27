const Comunidad = require("../../modelos/comunidades");

const obtenerComunidades = async (req, res) => {
  try {
    const comunidades = await Comunidad.find();
    res.status(200).json(comunidades);
  } catch (error) {
    console.error("Error al obtener las comunidades:", error);
    res.status(500).json({ message: "Error del servidor al obtener las comunidades." });
  }
};

module.exports = obtenerComunidades;