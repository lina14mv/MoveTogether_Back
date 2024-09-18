const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // Cargar variables de entorno

const express = require("express"); // Importar Express
const mongoose = require("mongoose"); // Importar Mongoose
const connectDB = require("./config/db.config.js"); // Importar función de conexión a la BD
const { join } = require("path"); // Importar función join de path
const cors = require("cors"); // Importar cors

const app = express();
const PORT = process.env.PORT || 3000;

// Importar rutas
const crearUsuario = require("./src/rutas/Registro/crearUsuarioRuta.js");
const login = require("./src/rutas/Registro/loginRuta.js");
const cambiarContrasenia = require("./src/rutas/Registro/cambiarContraseniaRuta.js");
const buscarPorNombre = require("./src/rutas/Usuarios/buscarPorNombreRuta.js");
const buscarPerfil = require("./src/rutas/Usuarios/buscarPerfilRuta.js");
const actualizarPerfil = require("./src/rutas/Usuarios/actualizarPerfilRuta.js");
const fotoPerfil = require("./src/rutas/Usuarios/fotoPerfilRuta.js");
const agregarAmigo = require("./src/rutas/Amigos/agregarAmigoRuta.js");
const eliminarAmigo = require("./src/rutas/Amigos/eliminarAmigoRuta.js");
const listarAmigos = require("./src/rutas/Amigos/listarAmigosRuta.js");

// Conexión a la base de datos
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con el origen de tu frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", crearUsuario);
app.use("/api", login);
app.use("/api", cambiarContrasenia);
app.use("/api", buscarPorNombre);
app.use("/api", buscarPerfil);
app.use("/api", actualizarPerfil);
app.use("/api", fotoPerfil);
app.use("/api", agregarAmigo);
app.use("/api", eliminarAmigo);
app.use("/api", listarAmigos);

// Servidor
app.listen(PORT, () => {
  console.log(
    `--------> Backend escuchando en http://localhost:${PORT} <--------`
  );
});
