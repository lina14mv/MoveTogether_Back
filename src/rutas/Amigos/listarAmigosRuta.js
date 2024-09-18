const express = require("express");
const router = express.Router();
const {
  listarAmigosPorEmail,
} = require("../../controladores/Amigos/listarAmigos");

// Ruta para obtener la lista de amigos por correo electrónico
router.get("/listar/amigos", listarAmigosPorEmail);

module.exports = router;
