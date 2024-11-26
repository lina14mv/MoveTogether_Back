const express = require("express");
const router = express.Router();
const eliminarPublicacion = require("../../controladores/Posts/eliminarPost"); // Cambia si la ruta es diferente
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.delete("/:postId/eliminar", verificarToken, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    eliminarPublicacion(req, res);
});

module.exports = router;
