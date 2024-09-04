// middlewares/validacionesCambiarContrasenia.cjs
const { body } = require("express-validator");

const validacionesCambiarContrasenia = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe proporcionar un email válido."),
  
  body("oldPassword")
    .notEmpty()
    .withMessage("La contraseña antigua es obligatoria."),

  body("newPassword")
    .notEmpty()
    .withMessage("La nueva contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La nueva contraseña debe tener al menos 8 caracteres.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*+?&])[A-Za-z\d@$!%*+?&]{8,}$/)
    .withMessage("La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."),
];

module.exports = validacionesCambiarContrasenia;
