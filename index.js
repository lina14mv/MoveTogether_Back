const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Cargar variables de entorno


const express = require("express"); // Importar Express
const mongoose = require("mongoose"); // Importar Mongoose
const connectDB = require("./config/db.config.js"); // Importar función de conexión a la BD
const { join } = require("path"); // Importar función join de path
const cors = require("cors"); // Importar cors

const app = express();
const PORT = process.env.PORT || 3000 ;

// Configuración de CORS
app.use(cors({
  origin: "https://tu-frontend.netlify.app", // Reemplaza con el dominio de Netlify
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));


// Importar rutas
const crearUsuario = require("./src/rutas/crearUsuarioRuta.js");
const login = require("./src/rutas/loginRuta.js");
const cambiarContrasenia = require("./src/rutas/cambiarContraseniaRuta.js");

// Conexión a la base de datos
connectDB();

app.use(cors({
  origin: "http://localhost:5173", // Reemplaza con el origen de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", crearUsuario);
app.use("/api", login);
app.use("/api", cambiarContrasenia);

// Servidor
app.listen(PORT, () => {
  console.log(
    `--------> Backend escuchando en http://localhost:${PORT} <--------`
  );
});
