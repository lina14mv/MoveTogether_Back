const Usuario = require("../../modelos/usuarios");
const Comunidad = require("../../modelos/comunidades");

// Buscar usuarios y comunidades por nombre
const busquedaGeneral = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    // Buscar usuarios que contengan el nombre (case-insensitive)
    const usuarios = await Usuario.find({
      fullname: { $regex: name, $options: "i" },
    })
      .select("fullname username avatar email sports ubi")
      .exec();

    // Buscar comunidades que contengan el nombre (case-insensitive)
    const comunidades = await Comunidad.find({
      nombre: { $regex: name, $options: "i" },
    })
      .select("nombre descripcion imagenPerfil categorias fechaCreacion")
      .exec();

    // Retornar ambos resultados
    res.status(200).json({ usuarios, comunidades });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar por nombre", error });
  }
};

module.exports = {
  busquedaGeneral,
};
