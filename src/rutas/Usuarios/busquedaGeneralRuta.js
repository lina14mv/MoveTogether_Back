const express = require("express");
const router = express.Router();
const {
  busquedaGeneral,
} = require("../../controladores/Usuarios/busquedaGeneral");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult, query } = require("express-validator");

// Validación de los parámetros de consulta
const searchValidator = [
  query("name")
    .notEmpty()
    .withMessage("El campo nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede tener más de 50 caracteres"),
];

// Ruta para buscar usuarios y comunidades por nombre
router.get(
  "/buscar/general",
  verificarToken, // Middleware para validar el token
  searchValidator, // Middleware para validar parámetros
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    busquedaGeneral(req, res, next); // Llamada al controlador
  }
);

module.exports = router;
