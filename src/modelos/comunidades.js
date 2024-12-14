const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComunidadSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  miembros: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  ],

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  eventos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evento",
  },
],
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  imagenPerfil: {
    type: String,
  },
  categorias: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Comunidad", ComunidadSchema);
