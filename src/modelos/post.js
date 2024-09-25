const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el esquema del Post
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a la colección de usuarios
    ref: "usuarios",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación
  },
  updatedAt: {
    type: Date,
  },
  likes: {
    type: Number,
    default: 0, // Inicia con 0 likes
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, // Referencia a comentarios
      ref: "Comment",
    },
  ],
  image: {
    type: String, // URL o nombre del archivo de imagen
    required: false,
  },
});

// Middleware para actualizar la fecha de actualización automáticamente
PostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Exportar el modelo
module.exports = mongoose.model("Post", PostSchema);
