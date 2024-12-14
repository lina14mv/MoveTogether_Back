const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", 
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    comunidad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comunidad",
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

// Validar que haya al menos contenido o una imagen
PostSchema.pre("validate", function (next) {
  if (!this.content && !this.image) {
    return next(new Error("La publicación debe contener texto, una imagen, o ambos."));
  }
  next();
});

module.exports = mongoose.model("Post", PostSchema);