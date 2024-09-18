const express = require("express");
const router = express.Router();
const {
  searchUsersByName,
} = require("../../controladores/Usuarios/buscarPorNombre");
const { validationResult, query } = require("express-validator");

// Validación de que el campo "nombre" no esté vacío
const searchValidator = [
  query("nombre")
    .notEmpty()
    .withMessage("El campo nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede tener más de 50 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre solo debe contener letras y espacios"),
];

// Ruta para buscar usuarios por nombre
router.get("/buscarNombre", searchValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  searchUsersByName(req, res, next);
});

module.exports = router;
