const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // Cargar variables de entorno

const express = require("express"); // Importar Express
const mongoose = require("mongoose"); // Importar Mongoose
const connectDB = require("./config/db.config.js"); // Importar función de conexión a la BD
const cors = require("cors"); // Importar CORS
const socketHandler = require("./config/socketHandler.js"); // Importar configuración de Socket.IO
const rutas = require("./src/rutas/indexRutas.js"); // Importar rutas

const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
connectDB();

// Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173", // Origen local para desarrollo
  "http://localhost:3000",
  "http://localhost:3004",
  "https://movetogether.netlify.app", 
  "https://move-together-back.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "El CORS policy no permite el acceso desde este origen.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // Para navegadores antiguos que requieren un status 200 en lugar de 204
};
app.use(cors(corsOptions));
app.get('/favicon.ico', (req, res) => res.status(204).end()); // Para evitar errores de favicon en el navegador con el despliegue en ralway


// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//pruebaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "prueba.html")); // Ruta al archivo HTML
});

// Importar rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de MoveTogether");
});

app.use(rutas);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Inicializar Socket.IO
socketHandler(server, allowedOrigins);

// Servidor
server.listen(PORT, () => {
  console.log(
    `--------> Backend escuchando en http://localhost:${PORT} <--------`
  );
});
