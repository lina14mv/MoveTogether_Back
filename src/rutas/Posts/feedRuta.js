const express = require("express");
const router = express.Router();
const { obtenerFeed } = require("../../controladores/Posts/feed");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.get("/posts/feed/", verificarToken, (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    obtenerFeed(req, res);
}); // Asegúrate de agregar el userId en los parámetros

module.exports = router;
