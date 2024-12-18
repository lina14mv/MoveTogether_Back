const express = require("express");
const router = express.Router();
const eliminarTodosAmigos = require("../../controladores/Amigos/eliminarTodosAmigos");
const verificarToken = require("../../middlewares/varificarToken.js"); // Middleware para verificar el token

router.delete("/eliminar/todos/amigos/:userId", verificarToken, eliminarTodosAmigos);

module.exports = router;