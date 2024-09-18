const express = require("express");
const router = express.Router();
const {
  getUserProfileByEmail,
} = require("../../controladores/Usuarios/buscarPerfil");
const { validationResult, query } = require("express-validator");

// Validación de que el campo "email" no esté vacío y sea un email válido
const profileValidator = [
  query("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("Por favor ingresa un email válido"),
];

// Ruta para obtener el perfil del usuario por correo electrónico
router.get("/buscarPerfil", profileValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  getUserProfileByEmail(req, res, next);
});

module.exports = router;
