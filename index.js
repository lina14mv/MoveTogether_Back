require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const connectDB = require("./config/db.config");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

//imporar rutas

const crearUsuario = require("./src/rutas/crearUsuarioRuta");

// Conexión a la base de datos
connectDB();

// Configuración
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", crearUsuario);

// Servidor
app.listen(PORT, () => {
  console.log(
    `--------> Backend escuchando en http://localhost:${PORT} <--------`
  );
});
