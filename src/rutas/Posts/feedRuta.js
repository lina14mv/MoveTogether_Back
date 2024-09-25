const express = require("express");
const router = express.Router();
const { obtenerFeed } = require("../../controladores/Posts/feed");

router.get("/posts/feed/:userId", obtenerFeed); // Asegúrate de agregar el userId en los parámetros

module.exports = router;
