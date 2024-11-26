const express = require("express");
const router = express.Router();
const {
  updateUserProfileByEmail,
} = require("../../controladores/Usuarios/actualizarPerfil");
const { body, validationResult } = require("express-validator");
const verificarToken = require("../../middlewares/varificarToken.js");

// Validaciones para los campos de actualización (puedes ajustar según sea necesario)
const updateValidator = [
  body("fullname")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("username")
    .optional()
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("phoneNumber")
    .optional()
    .matches(/^\d{7,10}$/)
    .withMessage("Por favor ingresa un número de teléfono válido"),
  body("birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida"),
  body("gender")
    .optional()
    .isIn(["Masculino", "Femenino"])
    .withMessage('El género debe ser "Masculino" o "Femenino"'),
  body("avatar")
    .optional()
    .isString()
    .withMessage("El avatar debe ser una cadena de texto"),
  body("sports")
    .optional()
    .isArray()
    .withMessage("Los deportes deben ser un arreglo de cadenas de texto"),
  body("ubi")
    .optional()
    .isObject()
    .withMessage("La ubicación debe ser un objeto"),
];

// Ruta para actualizar el perfil del usuario
router.put(
  "/actualizarPerfil",
  verificarToken,
  updateValidator,
  (req, res, next) => {
    const errors = validationResult(req);

    // Si hay errores de validación, devolverlos
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Si hay errores de validación, devolverlos
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Llamar a la función de actualización con los datos de la solicitud
    updateUserProfileByEmail(req, res)
      .then((response) => res.json(response))
      .catch((error) => next(error));
  }
);
module.exports = router;
