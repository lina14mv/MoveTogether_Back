// funciones/crearUsuario.js
const Usuario = require("../modelos/usuarios");

const crearUsuario = async (datosUsuario) => {
  try {
    console.log("Creando nuevo usuario:", datosUsuario);

    // Crear una instancia del nuevo usuario
    const nuevoUsuario = new Usuario(datosUsuario);

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    console.log("Usuario creado exitosamente:", nuevoUsuario);
    return { success: true, usuario: nuevoUsuario };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return { error: "Ocurrió un error al crear el usuario." };
  }
};

module.exports = crearUsuario;
