const Usuario = require("../../modelos/usuarios");

// Obtener lista de usuarios por nombre
const searchUsersByName = async (req, res) => {
  try {
    const {fullname } = req.query;

    if (!fullname) {
      return res.status(400).json({
        message: "El nombre es obligatorio para realizar la búsqueda",
      });
    }

    // Buscar usuarios cuyo nombre contenga el término buscado (case insensitive)
    const usuarios = await Usuario.find({
      fullname: { $regex: fullname, $options: "i" },
    })
    .select("-password -verificationCode -changePassCode  -createdAt -updatedAt -verifiedStatus") // Excluir la contraseña
    .populate("friends", "nombre email")
      .exec();

    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios con ese nombre" });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar usuarios", error });
  }
};

module.exports = {
  searchUsersByName,
};
