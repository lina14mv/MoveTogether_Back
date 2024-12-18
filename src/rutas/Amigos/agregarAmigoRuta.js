const express = require("express");
const router = express.Router();
const agregarAmigo = require("../../controladores/Amigos/agregarAmigo");
const verificarToken = require("../../middlewares/varificarToken.js");

router.post("/agregar/amigo/:amigoId", verificarToken, agregarAmigo);

module.exports = router;