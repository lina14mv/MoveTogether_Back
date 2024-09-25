const express = require("express");
const router = express.Router();
const eliminarPublicacion = require("../../controladores/Posts/eliminarPost"); // Cambia si la ruta es diferente

router.delete("/posts/eliminar/:post_id", eliminarPublicacion);

module.exports = router;
