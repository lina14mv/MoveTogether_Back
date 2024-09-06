const express = require('express');
const router = express.Router();
const verificarCodigoCambiarController = require('../controladores/verificarCodigoCambiar');
const validacionesCodigoCambiar = require('../middlewares/validacionesCodigoCambiar');
const { validationResult } = require('express-validator');

router.post('/verificar-codigo-cambiar', validacionesCodigoCambiar, async (req, res) => {
  // Verificar los resultados de la validación
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // Llamar al controlador para manejar la lógica de verificación del código
    const resultado = await verificarCodigoCambiarController(req);

    // Responder con el mensaje de éxito
    return res.status(201).json({
      mensaje: "Contraseña actualizada correctamente.",
      usuario: resultado.usuario,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
