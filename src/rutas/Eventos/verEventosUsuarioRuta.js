const express = require("express");
const router = express.Router();
const {
  obtenerEventos,
} = require("../../controladores/Eventos/verEventosUsuario");
const verificarToken = require("../../middlewares/varificarToken.js");
const { validationResult } = require("express-validator");

router.get("/usuarios/eventos", verificarToken, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  obtenerEventos(req, res);
});

module.exports = router;