const express = require("express");
const router = express.Router();
const verificarToken = require("../../middlewares/varificarToken.js");
const crearComunidad = require("../../controladores/comunidades/crearComunidad");

// Ruta para crear una comunidad (POST)
router.post("/crear/comunidad", verificarToken, crearComunidad);

module.exports = router;
