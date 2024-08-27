const express = require('express');
const router = express.Router();
const loginController = require('../controladores/login');
const loginValidator = require('../middlewares/validacionesLogin'); 
const { validationResult } = require("express-validator");

// Define la ruta para el endpoint de login y aplica las validaciones y el controlador
router.post('/login', loginValidator, async (req, res) => {
    // Verificar los resultados de la validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
  
    // Si no hay errores, proceder a manejar el login
    const datosLogin = req.body;
    const resultado = await loginController(datosLogin);
  
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error });
    }
  
    return res.status(200).json({ success: true, usuario: resultado.usuario });
  });
  
  module.exports = router;