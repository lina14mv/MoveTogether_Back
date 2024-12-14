const express = require("express");
const eventoController = require("../../controladores/Eventos/crearEvento");
const verificarToken = require("../../middlewares/varificarToken.js");
const {validationResult} = require("express-validator");

const router = express.Router();

router.post("/crear/evento", verificarToken, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        req.body.author = req.user.id; // Asigna el userId al campo author
    
        eventoController.crearEvento(req, res);
    });
    
    module.exports = router;