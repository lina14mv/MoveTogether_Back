const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Analizar la URI para extraer el nombre de la base de datos
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("La variable de entorno MONGO_URI no está definida");
    }                            
    const dbName = mongoURI.match(/\/([^\/?]+)(\?|$)/)[1];

    await mongoose.connect(mongoURI);
    console.log(`MongoDB conectado a la base de datos: ${dbName}`);
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    process.exit(1); // Terminar el proceso si no se puede conectar
  }
};

module.exports = connectDB;