const Usuario = require("../../src/modelos/usuarios.js");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// funciones/crearUsuario.js
const Usuario = require("../../modelos/usuarios");

const crearUsuario = async (datosUsuario, res) => {
  try {
    console.log("Creando nuevo usuario:", datosUsuario);

    const codigoVerificacion = crypto.randomBytes(3).toString("hex");

    const nuevoUsuario = new Usuario({
      ...datosUsuario,
      codigoVerificacion,
      verificado: false, // Usuario no verificado al inicio
      activo: false, // Usuario inactivo hasta que verifique el email
    });

    await nuevoUsuario.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: nuevoUsuario.email,
      subject: "Verificación de cuenta",
      text: `Hola ${nuevoUsuario.nombre},\n\nTu código de verificación es: ${codigoVerificacion}\n\nIngresa este código para verificar tu cuenta.`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Usuario creado exitosamente:", nuevoUsuario);
    return {
      success: true,
      message:
        "Usuario creado. Revisa tu correo electrónico para verificar tu cuenta.",
    };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return { error: "Ocurrió un error al crear el usuario." };
  }
};

module.exports = crearUsuario;
