const express = require("express");
const router = express.Router();
const { obtenerPerfilAmigo } = require("../../controladores/Amigos/perfilAmigo");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.get("/amigos/:amigoId/perfil", verificarToken, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    obtenerPerfilAmigo(req, res);
});

module.exports = router;