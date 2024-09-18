const express = require("express");
const router = express.Router();
const upload = require("../../../config/multer"); // Importa la configuración de multer
const subirFotoPerfil = require("../../controladores/Usuarios/fotoPerfil");

// Ruta para subir imagen de perfil
router.post(
  "/fotoPerfil/:email/profile-picture",
  upload.single("profile-picture"),
  subirFotoPerfil
);

module.exports = router;
