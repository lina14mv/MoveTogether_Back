const express = require("express");
const router = express.Router();
const eliminarAmigo = require("../../controladores/Amigos/eliminarAmigo");
const verificarToken = require("../../middlewares/varificarToken.js");

router.delete("/eliminar/amigo/:amigoId", verificarToken, eliminarAmigo);

module.exports = router;