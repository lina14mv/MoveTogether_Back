const express = require("express");
const router = express.Router();
const { filtrarComunidades } = require("../../controladores/comunidades/filtrarComunidades.js");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.post("/comunidades/filtrar", verificarToken, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    filtrarComunidades(req, res);
});

module.exports = router;