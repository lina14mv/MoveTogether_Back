const express = require("express");
const postController = require("../../controladores/Posts/crearPublicacion");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

const router = express.Router();

// Ruta para crear una nueva publicación
router.post("/crear/publicacion", verificarToken, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    req.body.author = req.user.id; // Asigna el userId al campo author

    postController.createPost(req, res);
});

module.exports = router;