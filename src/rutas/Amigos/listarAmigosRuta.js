const express = require("express");
const router = express.Router();
const {
  listarAmigosPorEmail,
} = require("../../controladores/Amigos/listarAmigos");
const { validationResult, query } = require("express-validator");
const verificarToken = require("../../middlewares/varificarToken.js");

// Ruta para obtener la lista de amigos por correo electrónico
router.get("/listar/amigos", verificarToken, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  listarAmigosPorEmail(req, res, next);
});

module.exports = router;
