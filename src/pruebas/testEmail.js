require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'linamunoz438@gmail.com',
  subject: 'Prueba de Nodemailer',
  text: 'Este es un correo de prueba enviado desde Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error al enviar el correo:', error);
  }
  console.log('Correo enviado:', info.response);
});
