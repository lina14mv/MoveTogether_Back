const express = require("express");
const router = express.Router();
const eliminarTodosAmigos = require("../../controladores/Amigos/eliminarTodosAmigos");

router.delete("/eliminar/todos/amigos/:userId", eliminarTodosAmigos);

module.exports = router;