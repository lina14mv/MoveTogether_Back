const express = require("express");
const router = express.Router();
const {
  getUserProfileByEmail,
} = require("../../controladores/Usuarios/buscarPerfil");
const { validationResult, query } = require("express-validator");

const verificarToken = require("../../middlewares/varificarToken.js");

// Ruta para obtener el perfil del usuario por correo electrónico
router.get("/buscarPerfil", verificarToken, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  getUserProfileByEmail(req, res, next);
});

module.exports = router;
