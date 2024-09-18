const express = require("express");
const router = express.Router();
const eliminarAmigo = require("../../controladores/Amigos/eliminarAmigo");

// Ruta para eliminar amigo
router.post("/eliminar/amigo", eliminarAmigo);

module.exports = router;
