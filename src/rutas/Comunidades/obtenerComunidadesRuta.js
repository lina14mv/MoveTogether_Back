const express = require("express");
const router = express.Router();
const obtenerComunidades = require("../../controladores/comunidades/obtenerComunidades");
const verificarToken = require("../../middlewares/varificarToken");

router.get("/comunidades", verificarToken, obtenerComunidades);

module.exports = router;