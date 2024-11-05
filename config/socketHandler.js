// server/socketHandler.js
const { Server } = require("socket.io");
const Conversation = require("../src/modelos/conversation");
const Usuario = require("../src/modelos/usuarios");

const socketHandler = (server, allowedOrigins) => {
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutos
      skipMiddlewares: true,
    },
  });

  console.log("Configuración de Socket.IO completada.");

  io.on("connection", (socket) => {
    // Evento para unirse a una conversación
    socket.on("joinConversation", async (friendId, currentUserId) => {
      try {
        // Verifica que ambos usuarios existan
        const currentUser = await Usuario.findById(currentUserId);
        const friend = await Usuario.findById(friendId);

        if (!currentUser || !friend) {
          return socket.emit("error", "Uno o ambos usuarios no existen.");
        }

        // Buscar o crear la conversación entre los dos usuarios
        let conversation = await Conversation.findOne({
          participants: { $all: [currentUserId, friendId] },
        })
          .populate("messages.sender")
          .populate("messages.recipient");

        if (conversation) {
          socket.join(conversation._id);
          socket.emit("conversationJoined", {
            conversationId: conversation._id,
          });
          socket.emit("previousMessages", conversation.messages);
          console.log(
            `Usuario ${socket.id} se unió a la conversación ${conversation._id}`
          );

          // Resetear el conteo de mensajes no leídos
          await Usuario.findByIdAndUpdate(currentUserId, {
            $set: { [`unreadMessages.${conversation._id}`]: 0 },
          });
        } else {
          conversation = new Conversation({
            participants: [currentUserId, friendId],
            messages: [],
            lastMessage: "",
          });
          await conversation.save();

          await Usuario.findByIdAndUpdate(currentUserId, {
            $push: { conversations: conversation._id },
          });
          await Usuario.findByIdAndUpdate(friendId, {
            $push: { conversations: conversation._id },
          });

          socket.join(conversation._id);
          socket.emit("conversationJoined", {
            conversationId: conversation._id,
          });
          console.log(
            `Nueva conversación creada entre ${currentUserId} y ${friendId} con ID: ${conversation._id}`
          );
        }
      } catch (error) {
        console.error(`Error al gestionar la conversación: ${error}`);
      }
    });

    // Evento para enviar un mensaje
    // Dentro del evento "sendMessage" en server/socketHandler.js
    socket.on("sendMessage", async (messageData) => {
      const { conversationId, message } = messageData;

      try {
        console.log(
          `Intentando enviar mensaje a la conversación ${conversationId}`
        );

        const newMessage = {
          sender: message.sender,
          recipient: message.recipient,
          content: message.content,
          type: message.type,
          timestamp: message.timestamp,
        };

        const updatedConversation = await Conversation.findByIdAndUpdate(
          conversationId,
          {
            $push: { messages: newMessage },
            lastMessage: newMessage.content,
          },
          { new: true }
        );

        if (!updatedConversation) {
          throw new Error("Conversación no encontrada");
        }

        // Incrementar el conteo de mensajes no leídos del destinatario
        await Usuario.findByIdAndUpdate(message.recipient, {
          $inc: { [`unreadMessages.${conversationId}`]: 1 },
        });

        io.to(conversationId).emit("receiveMessage", newMessage);
        console.log(
          `Mensaje enviado correctamente a la conversación ${conversationId}`
        );
      } catch (error) {
        console.error(
          `Error al enviar el mensaje a la conversación ${conversationId}: ${error}`
        );
      }
    });

    // Manejar la desconexión de los usuarios
    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
