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
const allowedOrigins = [
  "http://localhost:5173", // Origen local para desarrollo
  "https://movetogether.netlify.app" // Origen de tu frontend desplegado
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como las de herramientas de prueba)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El CORS policy no permite el acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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
const verificarCodigo = require("./src/rutas/verificarCodigoRuta.js");
const verificarCodigoInicio = require("./src/controladores/verificarCodigoInicio.js");
const verificarCodigoCambiar = require("./src/rutas/verificarCodigoCambiarRuta.js");

// Rutas
app.use("/api", crearUsuario);
app.use("/api", login);
app.use("/api", cambiarContrasenia);
app.use("/api", verificarCodigo);
app.use("/api", verificarCodigoInicio);
app.use("/api", verificarCodigoCambiar);

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de MoveTogether');
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
