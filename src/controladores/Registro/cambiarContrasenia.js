const Usuario = require("../../modelos/usuarios");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Configuración de transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar el código de cambio de contraseña
const cambioContrasenia = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const codigoCambio = crypto.randomBytes(3).toString("hex");
    usuario.changePassCode = codigoCambio;
    await usuario.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: usuario.email,
      subject: "Código de Cambio de Contraseña",
      text: `Hola ${usuario.nombre},\n\nTu código para cambiar la contraseña es: ${codigoCambio}\n\nSi no solicitaste este cambio, por favor ignora este correo.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      mensaje: "Código de cambio de contraseña enviado a tu correo.",
    });
  } catch (error) {
    console.error("Error al solicitar cambio de contraseña:", error);
    res
      .status(500)
      .json({
        mensaje: "Ocurrió un error al solicitar el cambio de contraseña",
      });
  }
};

// Función para verificar el código de cambio de contraseña
const verificarCodigoCambio = async (req, res) => {
  const { code } = req.body;

  try {
    const usuario = await Usuario.findOne({ changePassCode: code });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Código incorrecto" });
    }

    res.json({ mensaje: "Código verificado correctamente." });
  } catch (error) {
    console.error("Error al verificar el código:", error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al verificar el código" });
  }
};

// Función para cambiar la contraseña
const nuevaContrasenia = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Validar el formato de la nueva contraseña directamente en el controlador
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+?&])[A-Za-z\d@$!%+?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res
        .status(400)
        .json({
          mensaje: "La nueva contraseña no cumple con el formato requerido.",
        });
    }

    usuario.password = newPassword;
    usuario.changePassCode = null; // Limpiar el código temporal

    await usuario.save();

    res.json({ mensaje: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al cambiar la contraseña" });
  }
};

// Exportar las funciones
module.exports = {
  cambioContrasenia,
  verificarCodigoCambio,
  nuevaContrasenia,
};
