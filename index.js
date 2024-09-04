const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Cargar variables de entorno

const express = require("express"); // Importar Express
const mongoose = require("mongoose"); // Importar Mongoose
const connectDB = require("./config/db.config.js"); // Importar función de conexión a la BD
const cors = require("cors"); // Importar CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Configuración de CORS
app.use(cors({
  origin: "https://movetogether.netlify.app", // Reemplaza con el dominio de Netlify
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const crearUsuario = require("./src/rutas/crearUsuarioRuta.js");
const login = require("./src/rutas/loginRuta.js");
const cambiarContrasenia = require("./src/rutas/cambiarContraseniaRuta.js");

// Rutas
app.use("/api", crearUsuario);
app.use("/api", login);
app.use("/api", cambiarContrasenia);

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Move Together');
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Servidor
app.listen(PORT, () => {
  console.log(
    `--------> Backend escuchando en http://localhost:${PORT} <--------`
  );
});
