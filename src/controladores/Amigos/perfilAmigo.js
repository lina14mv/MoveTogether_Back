const Usuario = require("../../modelos/usuarios");
const mongoose = require("mongoose");

exports.obtenerPerfilAmigo = async (req, res) => {
  const amigoId = req.params.amigoId;

  // Validar si el amigoId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(amigoId)) {
    return res.status(400).json({ message: "ID de amigo no válido." });
  }

  try {
    // Buscar al amigo por ID
    const amigo = await Usuario.findById(amigoId)
      .select("-password -verificationCode -changePassCode -createdAt -updatedAt -verifiedStatus") // Excluir la contraseña y otros campos sensibles
      .populate("friends", "fullname avatar username");

    if (!amigo) {
      return res.status(404).json({ message: "Amigo no encontrado." });
    }

    // Devolver el perfil del amigo
    return res.status(200).json(amigo);
  } catch (error) {
    console.error("Error al obtener el perfil del amigo:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};