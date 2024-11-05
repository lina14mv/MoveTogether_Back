const express = require('express');
const Conversation = require('../../modelos/conversation');
const Usuario = require('../../modelos/usuarios'); // Importar el modelo de Usuario
const router = express.Router();

// Endpoint para obtener todas las conversaciones del usuario
router.get('/conversations/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.find({
      participants: userId
    }).populate('messages.sender', 'fullname avatar'); // Opcional: poblar información del usuario

    // Agregar el conteo de mensajes no leídos a cada conversación
    const updatedConversations = await Promise.all(conversations.map(async (convo) => ({
      ...convo.toObject(),
      unreadCount: (await Usuario.findById(userId)).unreadMessages.get(convo._id) || 0 // Obtener el conteo de mensajes no leídos
    })));

    res.status(200).json(updatedConversations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener conversaciones', error });
  }
});

module.exports = router;
