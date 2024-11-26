const express = require("express");
const router = express.Router();
const {
  obtenerPublicaciones,
} = require("../../controladores/Posts/publicacionesUsuario");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.get("/usuarios/publicaciones", verificarToken, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  obtenerPublicaciones(req, res);
});

module.exports = router;
