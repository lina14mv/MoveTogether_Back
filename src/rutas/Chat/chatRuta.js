const express = require('express');
const Conversation = require('../../modelos/conversation');
const router = express.Router();

// Endpoint para crear una conversación y enviar un mensaje
router.post('/message', async (req, res) => {
  const { sender, recipient, content, type } = req.body;

  try {
    // Buscar o crear la conversación
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, recipient] }
    });

    if (!conversation) {
      conversation = new Conversation({ participants: [sender, recipient] });
    }

    // Crear el nuevo mensaje
    const newMessage = { sender, content, type };

    // Agregar el mensaje a la conversación
    conversation.messages.push(newMessage);
    conversation.lastMessage = content; // Actualizar el último mensaje

    await conversation.save();

    res.status(200).json({ conversation, message: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear/enviar el mensaje', error });
  }
});

module.exports = router;
