const Usuario = require('../../src/modelos/usuarios.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Para generar el código de verificación

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // El correo electrónico desde donde se enviarán los mensajes
    pass: process.env.EMAIL_PASS, // La contraseña de aplicaciones o el token generado
  },
});

// Función para crear un nuevo usuario y enviar el correo de verificación
const crearUsuario = async (datosUsuario) => {
  try {
    console.log("Creando nuevo usuario:", datosUsuario);

    // Generar un código de verificación aleatorio
    const codigoVerificacion = crypto.randomBytes(3).toString('hex'); // Código de 6 caracteres

    // Crear una instancia del nuevo usuario con el código de verificación
    const nuevoUsuario = new Usuario({
      ...datosUsuario,
      codigoVerificacion,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Configuración del correo de verificación
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: nuevoUsuario.email,
      subject: 'Verificación de cuenta',
      text: `Hola ${nuevoUsuario.nombre},\n\nTu código de verificación es: ${codigoVerificacion}\n\nIngresa este código para verificar tu cuenta.`,
    };

    // Enviar el correo de verificación
    await transporter.sendMail(mailOptions);

    console.log("Usuario creado exitosamente:", nuevoUsuario);
    return { success: true, message: "Usuario creado. Revisa tu correo electrónico para verificar tu cuenta." };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return { error: "Ocurrió un error al crear el usuario." };
  }
};

module.exports = crearUsuario;

