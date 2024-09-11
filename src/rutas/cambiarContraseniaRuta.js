const express = require("express");
const router = express.Router();
const {
  cambioContrasenia,
  verificarCodigoCambio,
  nuevaContrasenia,
} = require("../controladores/cambiarContrasenia.js");
const {
    validacionesCambioContrasenia,
    validacionesVerificarCodigoCambio,
    validacionesNuevaContrasenia,
} = require("../middlewares/validacionesCambiarContrasenia.js");
const { validationResult } = require("express-validator");

// Ruta para solicitar el cambio de contraseña
router.post("/cambio-contrasenia", validacionesCambioContrasenia, async (req, res) => {
  // Validar los datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, devolver un estado 400 con los errores
    return res.status(400).json({ errors: errors.array() });
  }
  // Llamar al controlador para manejar la lógica de solicitud de cambio de contraseña
  cambioContrasenia(req, res);
});

// Ruta para verificar el código
router.post("/verificar-codigo-cambio", validacionesVerificarCodigoCambio, async (req, res) => {
  // Validar los datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, devolver un estado 400 con los errores
    return res.status(400).json({ errors: errors.array() });
  }
  // Llamar al controlador para manejar la lógica de verificación del código
  verificarCodigoCambio(req, res);
});

// Ruta para cambiar la contraseña
router.post("/nueva-contrasenia", validacionesNuevaContrasenia, async (req, res) => {
  // Validar los datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, devolver un estado 400 con los errores
    return res.status(400).json({ errors: errors.array() });
  }
  // Llamar al controlador para manejar la lógica de cambio de contraseña
  nuevaContrasenia(req, res);
});

module.exports = router;