const express = require("express");
const router = express.Router();
const agregarAmigo = require("../../controladores/Amigos/agregarAmigo");

// Ruta para agregar nuevo amigo
router.post("/agregar/amigo", agregarAmigo);

module.exports = router;
