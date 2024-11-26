const express = require("express");
const verificarToken = require("../../middlewares/varificarToken.js");
const ultimoMensaje = require("../../controladores/Mensajes/ultimomensaje");

const router = express.Router();

// Ruta para obtener el último mensaje de una conversación
router.get("/ultimo-mensaje", verificarToken, async (req, res) => {
  try {
    const conversationSummary = await ultimoMensaje(req.user.id); // Usar req.user.id
    res.json(conversationSummary);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el resumen de la conversación" });
  }
});

module.exports = router;