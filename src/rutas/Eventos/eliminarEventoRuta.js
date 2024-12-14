const express = require("express");
const router = express.Router();
const eliminarEvento = require("../../controladores/Eventos/eliminarEvento"); // Cambia si la ruta es diferente
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.delete("/:eventoId/eliminarEvento", verificarToken, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    eliminarEvento(req, res);
});

module.exports = router;