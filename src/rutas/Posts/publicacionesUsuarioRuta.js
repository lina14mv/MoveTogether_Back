const express = require("express");
const router = express.Router();
const {
  obtenerPublicaciones,
} = require("../../controladores/Posts/publicacionesUsuario");

router.get("/usuarios/:userId/publicaciones", obtenerPublicaciones);

module.exports = router;
