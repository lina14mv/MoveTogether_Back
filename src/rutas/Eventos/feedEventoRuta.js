const express = require("express");
const router = express.Router();
const { obtenerFeedEventos } = require("../../controladores/Eventos/feedEventos");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.get("/eventos/feed/", verificarToken, (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    obtenerFeedEventos(req, res);
});

module.exports = router;