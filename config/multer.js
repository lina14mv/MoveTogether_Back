const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile_pictures"); // Carpeta donde se guardarán las fotos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`; // Nombre del archivo con timestamp
    cb(null, filename);
  },
});

// Configuración de multer
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Tamaño máximo de archivo: 2MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (![".jpg", ".jpeg", ".png"].includes(ext.toLowerCase())) {
      return cb(
        new Error(
          "Tipo de archivo no permitido. Solo se permiten JPG, JPEG, PNG."
        )
      );
    }
    cb(null, true);
  },
});

module.exports = upload;
