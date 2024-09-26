const mongoose = require("mongoose");

// Definimos el esquema para el usuario
const UsuarioSchema = new mongoose.Schema(
  {
    fullname: {
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
    verificationCode: {
      type: String,
      required: false, // No es requerido al crear el usuario pero se agregará después
    },
    changePassCode: { 
      type: String,
      required: false, // No es requerido al crear el usuario pero se agregará después
    },
    verifiedStatus: {
      type: Boolean,
      default: false, // Al crear el usuario, no está verificado
    },
    status: {
      type: Boolean,
      default: false, // Usuario inactivo hasta que verifique su email
    },
    phoneNumber: {
      type: String,
      match: [/^\d{7,10}$/, "Por favor ingresa un número de teléfono válido"],
    },
    birthDate: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    gender: {
      type: String,
      enum: ["Masculino", "Femenino"],
    },
    avatar: {
      type: String,
      default: "default-avatar.png",
    },
    sports: {
      type: [String],
      required: [true, "El deporte es obligatorio"],
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    ubi: {
      coutry: { type: String },
      city: { type: String },
    },
    posts: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String },
        date: {type: Date},
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
        comments: [
          {
            usuario: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Usuario",
              required: true,
            },
            content: { type: String, required: true },
            date: { type: Date, default: Date.now },
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
