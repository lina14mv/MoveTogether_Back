const { validationResult } = require("express-validator");
const Conversacion = require("../../modelos/conversacion");
const Mensaje = require("../../modelos/mensaje");

const enviarMensaje = async (req, res) => {
  try {
    const { senderId, receiverId, content, mediaType, mediaURL } = req.body;

    const newMensaje = new Mensaje({
      sender: senderId,
      receiver: receiverId,
      content,
      mediaType,
      mediaURL
    });

    await newMensaje.save();

    // También actualizas la conversación
    let conversacion = await Conversacion.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversacion) {
      conversacion = new Conversacion({
        participants: [senderId, receiverId],
        mensaje: [newMensaje._id]
      });
    } else {
      conversacion.mensaje.push(newMensaje._id);
    }

    conversacion.lastMessage = newMensaje._id;
    conversacion.updatedAt = Date.now();

    await conversacion.save();

    res.status(200).json(newMensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { enviarMensaje };