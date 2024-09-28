const Usuario = require("../../modelos/usuarios");

const agregarAmigo = async (req, res) => {
  try {
    const { email, amigoEmail } = req.body;

    // Verificar que el usuario que envía la solicitud exista
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar que el amigo que se quiere agregar exista
    const amigo = await Usuario.findOne({ email: amigoEmail });
    if (!amigo) {
      return res
        .status(404)
        .json({ message: "El amigo que intentas agregar no existe" });
    }

    // Verificar que el amigo no sea el mismo usuario
    if (email === amigoEmail) {
      return res
        .status(400)
        .json({ message: "No puedes agregarte a ti mismo como amigo" });
    }

    // Verificar si ya son amigos
    if (usuario.friends.includes(amigo._id)) {
      return res.status(400).json({ message: "El usuario ya es tu amigo" });
    }

    // Agregar el amigo al array de amigos del usuario
    usuario.friends.push(amigo._id);
    await usuario.save();

    // Hacer populate para devolver más detalles de los amigos
    const usuarioActualizado = await Usuario.findOne({ email }).populate(
      "friends",
      "nombre email"
    );

    res.status(200).json({
      message: "Amigo agregado exitosamente",
      amigos: usuarioActualizado.friends, // Devolver la lista actualizada de amigos con detalles
    });
  } catch (error) {
    console.error("Error al agregar amigo:", error);
    res.status(500).json({ message: "Error al agregar amigo", error });
  }
};

module.exports = agregarAmigo;
