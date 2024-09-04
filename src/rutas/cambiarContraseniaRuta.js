const express = require("express");
const router = express.Router();
const cambiarContraseniaController = require("../controladores/cambiarContrasenia.js");
const cambiarContraseniaValidator = require("../middlewares/validacionesCambiarContrasenia.js");
const { validationResult } = require("express-validator");

// Ruta para cambiar la contraseña
router.post("/cambiar-contrasenia", cambiarContraseniaValidator, async (req, res) => {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, devolver un estado 400 con los errores
        return res.status(400).json({ errors: errors.array() });
    }
    // Llamar al controlador para manejar la lógica de cambio de contraseña
    cambiarContraseniaController(req, res);
});

module.exports = router;