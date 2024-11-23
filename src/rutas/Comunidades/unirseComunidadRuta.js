const express = require("express");
const router = express.Router();
const verificarToken = require("../../middlewares/varificarToken.js");
const unirseComunidad = require("../../controladores/comunidades/unirseComunidad");

router.post("/unirse/comunidad/:comunidadId", verificarToken, unirseComunidad);

module.exports = router;
