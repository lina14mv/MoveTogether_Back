const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/profile_pictures"; // Carpeta por defecto para fotos de perfil

    // Si la solicitud es para crear un post, cambiamos la carpeta de destino
    if (req.originalUrl.includes("/posts")) {
      folder = "uploads/post_images"; // Carpeta para las imágenes de los posts
    }

    cb(null, folder); // Definimos la carpeta en la que se guardará el archivo
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
