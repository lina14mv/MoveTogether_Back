const { body } = require("express-validator");

const validacionesCambiarContrasenia = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe proporcionar un email válido."),
];

module.exports = validacionesCambiarContrasenia;
