// routes/osrmRoutes.js
const express = require("express");
const { getRoute } = require("../../controladores/Mapa/osrmController");

const router = express.Router();

// Definir el endpoint para calcular la ruta
router.post("/ruta/mapa", getRoute);

module.exports = router;
