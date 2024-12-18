const Usuario = require("../../modelos/usuarios");
const mongoose = require("mongoose");

const eliminarAmigo = async (req, res) => {
  try {
    const userId = req.user.id;
    const amigoId = req.params.amigoId;

    // Verificar que el amigoId sea válido
    if (!mongoose.Types.ObjectId.isValid(amigoId)) {
      return res.status(400).json({ message: "ID de amigo no válido." });
    }

    // Verificar que el usuario que envía la solicitud exista
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar que el amigo que se quiere eliminar exista
    const amigo = await Usuario.findById(amigoId);
    if (!amigo) {
      return res.status(404).json({ message: "El amigo que intentas eliminar no existe" });
    }

    // Verificar si son amigos
    if (!usuario.friends.includes(amigo._id)) {
      return res.status(400).json({ message: "El usuario no es tu amigo" });
    }

    // Eliminar el amigo del array de amigos del usuario
    usuario.friends.pull(amigo._id);
    await usuario.save();

    // Eliminar el usuario del array de amigos del amigo
    amigo.friends.pull(usuario._id);
    await amigo.save();

    // Hacer populate para devolver más detalles de los amigos
    const usuarioActualizado = await Usuario.findById(userId).populate("friends", "nombre email");

    res.status(200).json({
      message: "Amigo eliminado exitosamente",
      amigos: usuarioActualizado.friends, // Devolver la lista actualizada de amigos con detalles
    });
  } catch (error) {
    console.error("Error al eliminar amigo:", error);
    res.status(500).json({ message: "Error al eliminar amigo", error });
  }
};

module.exports = eliminarAmigo;