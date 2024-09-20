const express = require("express");
const router = express.Router();
const verificarCodigoController = require("../../controladores/Registro/verificarCodigo");
const verificarCodigoValidator = require("../../middlewares/ValidacionesCodigo");

router.post(
  "/verificar-codigo",
  verificarCodigoValidator,
  verificarCodigoController
);

module.exports = router;
