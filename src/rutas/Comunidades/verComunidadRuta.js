const express = require("express");
const router = express.Router();
const verComunidad = require("../../controladores/comunidades/verComunidad.js");
const verificarToken = require("../../middlewares/varificarToken.js"); // Asegúrate de que la ruta sea correcta
const { validationResult } = require("express-validator");

router.get("/comunidades/:comunidadId", verificarToken, verComunidad);

module.exports = router;