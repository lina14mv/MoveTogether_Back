const express = require("express");
const router = express.Router();
const postController = require("../../controladores/Posts/crearPublicacion");
const upload = require("../../../config/multer"); // Importamos Multer

// Ruta para crear una nueva publicación
router.post("/crear/publicacion", upload.any(), postController.createPost);

module.exports = router;
