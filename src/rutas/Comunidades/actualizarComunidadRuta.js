const express = require("express");
const router = express.Router();
const actualizarComunidad = require("../../controladores/comunidades/actualizarComunidad.js"); // Ajusta la ruta si es necesario
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.put("/:comunidadId/actualizarComu", verificarToken, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  actualizarComunidad(req, res);
});

module.exports = router;