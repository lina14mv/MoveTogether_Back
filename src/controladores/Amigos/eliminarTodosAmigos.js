const Usuario = require("../../modelos/usuarios");

const eliminarTodosAmigos = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verificar que el usuario que se quiere modificar exista
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener la lista de amigos del usuario
    const amigos = usuario.friends;

    // Eliminar al usuario de la lista de amigos de cada amigo
    for (const amigoId of amigos) {
      const amigo = await Usuario.findById(amigoId);
      if (amigo) {
        amigo.friends.pull(usuario._id);
        await amigo.save();
      }
    }

    // Vaciar la lista de amigos del usuario
    usuario.friends = [];
    await usuario.save();

    res.status(200).json({ message: "Todos los amigos han sido eliminados exitosamente" });
  } catch (error) {
    console.error("Error al eliminar todos los amigos:", error);
    res.status(500).json({ message: "Error al eliminar todos los amigos", error });
  }
};

module.exports = eliminarTodosAmigos;