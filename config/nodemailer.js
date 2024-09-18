const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilizamos Gmail como servicio de correo
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS  // Contraseña de aplicación de Gmail
  }
});

console.log(`Email User: ${process.env.EMAIL_USER}`);
console.log(`Email Pass: ${process.env.EMAIL_PASS}`);

module.exports = transporter;
