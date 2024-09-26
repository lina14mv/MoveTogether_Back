const { body } = require("express-validator");
const Usuario = require('../../src/modelos/usuarios.js'); // Ajusta la ruta según sea necesario

const usuarioValidator = [
  body("fullname")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .trim()
    .matches(/^(\S+\s+\S+.*)$/)
    .withMessage("El nombre completo debe contener al menos dos palabras"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe proporcionar un email válido")
    .normalizeEmail()
    .custom(async (value) => {
      // Verificar si el correo ya existe en la base de datos
      const emailExistente = await Usuario.findOne({ email: value });
      if (emailExistente) {
        throw new Error("Ya existe un cliente con este correo electrónico.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*+?&])[A-Za-z\d@$!%*+?&]{8,}$/
    )
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, solo se aceptan @$!%*+?&"
    ),

  body("passwordConfirm")
    .notEmpty()
    .withMessage("La confirmación de la contraseña es obligatoria")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),

  body("phoneNumber")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser una cadena de texto")
    .matches(/^\d{7,10}$/)
    .withMessage("Debe proporcionar un número de teléfono válido")
    .custom(async (value) => {
      // Verificar si el telefono ya existe en la base de datos
      const telefonoExistente = await Usuario.findOne({ telefono: value });
      if (telefonoExistente) {
        throw new Error("Ya existe un cliente con este telefono.");
      }
      return true;
    }),

  body("birthDate")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .isDate()
    .withMessage("Debe proporcionar una fecha válida"),

  body("gender")
    .optional()
    .isIn(["Masculino", "Femenino"])
    .withMessage("Género inválido"),

  body("ubi.country")
    .optional()
    .isString()
    .withMessage("El país debe ser una cadena de texto"),

  body("ubi.city")
    .optional()
    .isString()
    .withMessage("La ciudad debe ser una cadena de texto"),
];

module.exports = usuarioValidator;
