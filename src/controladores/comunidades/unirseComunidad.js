const Comunidad = require("../../modelos/comunidades");

const unirseComunidad = async (req, res) => {
  console.log("unirseComunidadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const { comunidadId } = req.params; // ID de la comunidad recibido como parámetro
  const usuarioId = req.user.id; // Obtiene el ID del usuario desde el token JWT

  console.log("Controlador alcanzado: unirseComunidad"); // Confirmación de que la función se está ejecutando
  console.log("Datos recibidos:", { comunidadId, usuarioId }); //

  try {
    // Buscar la comunidad por su ID
    const comunidad = await Comunidad.findById(comunidadId);

    if (!comunidad) {
      return res.status(404).json({ message: "La comunidad no existe." });
    }

    // Verificar si el usuario ya es miembro de la comunidad
    if (comunidad.miembros.includes(usuarioId)) {
      return res
        .status(400)
        .json({ message: "Ya eres miembro de esta comunidad." });
    }

    // Agregar el ID del usuario al array de miembros
    comunidad.miembros.push(usuarioId);

    // Guardar los cambios en la base de datos
    await comunidad.save();

    return res.status(200).json({
      message: "Te has unido a la comunidad exitosamente.",
      comunidad,
    });
  } catch (error) {
    console.error("Error al unirse a la comunidad:", error);
    return res
      .status(500)
      .json({ message: "Error del servidor al unirse a la comunidad." });
  }
};

module.exports = unirseComunidad;
