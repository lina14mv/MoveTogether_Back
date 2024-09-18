const mongoose = require("mongoose");

// Definimos el esquema para el usuario
const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Por favor ingresa un email válido"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    codigoVerificacion: {
      type: String,
      required: false, // No es requerido al crear el usuario pero se agregará después
    },
    codigoCambioContrasena: { 
      type: String,
      required: false, // No es requerido al crear el usuario pero se agregará después
    },
    verificado: {
      type: Boolean,
      default: false, // Al crear el usuario, no está verificado
    },
    activo: {
      type: Boolean,
      default: false, // Usuario inactivo hasta que verifique su email
    },
    telefono: {
      type: String,
      match: [/^\d{7,10}$/, "Por favor ingresa un número de teléfono válido"],
    },
    fechaNacimiento: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    genero: {
      type: String,
      enum: ["Masculino", "Femenino"],
    },
    avatar: {
      type: String,
      default: "default-avatar.png",
    },
    deportes: {
      type: [String],
      required: [true, "El deporte es obligatorio"],
    },
    amigos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    ubicacion: {
      pais: { type: String },
      ciudad: { type: String },
    },
    publicaciones: [
      {
        titulo: { type: String, required: true },
        contenido: { type: String, required: true },
        imagen: { type: String },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
        comentarios: [
          {
            usuario: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Usuario",
              required: true,
            },
            contenido: { type: String, required: true },
            fecha: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  },
  {
    collection: "Usuarios",
    timestamps: true,
  }
);

// Creamos el modelo basado en el esquema
const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
