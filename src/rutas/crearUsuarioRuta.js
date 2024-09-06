// rutas/usuarios.js
const express = require("express");
const router = express.Router();
const crearUsuario = require("../controladores/crearUsuario.js");
const usuarioValidator = require("../middlewares/validacionesCrear.js");
const { validationResult } = require("express-validator");

router.post("/usuarios/crear", usuarioValidator, async (req, res) => {
  // Verificar los resultados de la validación
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Si no hay errores, proceder a crear el usuario
  const datosUsuario = req.body;
  const resultado = await crearUsuario(datosUsuario);

  if (resultado.error) {
    return res.status(500).json({ error: resultado.error });
  }

  res.status(201).json({
    mensaje: "Usuario creado. Revisa tu correo electrónico para verificar tu cuenta.",
    usuario: resultado.usuario,
  });
});

module.exports = router;
