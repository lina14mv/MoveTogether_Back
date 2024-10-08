const Usuario = require("../../modelos/usuarios");

const eliminarAmigo = async (req, res) => {
  try {
    const { email, amigoEmail } = req.body;

    // Verificar que el usuario que envía la solicitud exista
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar que el amigo que se quiere eliminar exista
    const amigo = await Usuario.findOne({ email: amigoEmail });
    if (!amigo) {
      return res
        .status(404)
        .json({ message: "El amigo que intentas eliminar no existe" });
    }

    // Verificar que no se este intentando eliminar a si mismo
    if (email === amigoEmail) {
      return res.status(400).json({ message: "No puedes eliminarte a ti mismo como amigo" });
    }
    // Verificar si el amigo está en la lista de amigos del usuario
    if (!usuario.friends.includes(amigo._id)) {
      return res.status(400).json({ message: "El usuario no es tu amigo" });
    }

    // Eliminar el amigo del array de amigos del usuario
    usuario.friends = usuario.friends.filter((id) => !id.equals(amigo._id));
    await usuario.save();

    // Hacer populate para devolver más detalles de los amigos restantes
    const usuarioActualizado = await Usuario.findOne({ email }).populate(
      "friends",
      "nombre email"
    );

    res.status(200).json({
      message: "Amigo eliminado exitosamente",
      amigos: usuarioActualizado.friends, // Devolver la lista actualizada de amigos
    });
  } catch (error) {
    console.error("Error al eliminar amigo:", error);
    res.status(500).json({ message: "Error al eliminar amigo", error });
  }
};

module.exports = eliminarAmigo;
