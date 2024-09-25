const express = require("express");
const router = express.Router();
const actualizarPublicacion = require("../../controladores/Posts/actualizarPost");

// Ruta para actualizar una publicación
router.put("/actualizar/post/:post_id", actualizarPublicacion);

module.exports = router;
