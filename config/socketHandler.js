const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Usuario = require("../src/modelos/usuarios"); // Ajusta la ruta si es necesario
const Conversation = require("../src/modelos/conversation"); // Ajusta la ruta si es necesario

const socketHandler = (server, allowedOrigins) => {
  // Variable para rastrear usuarios conectados
  const connectedUsers = new Map();
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 60 * 60 * 1000, // 2 minutos
      skipMiddlewares: true,
    },
  });

  console.log("Socket.IO configurado.");

  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    // Decodificar el token y obtener el ID del usuario
    const token = socket.handshake.auth.token;
    let currentUserId;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      currentUserId = decoded.id;
      console.log("Usuario autenticado:", currentUserId);
      connectedUsers.set(currentUserId, socket.id);
      console.log(`Usuario ${currentUserId} conectado en el socket ${socket.id}`);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      socket.emit("error", "Token inválido");
      return;
    }

    // Manejar desconexiones
    socket.on("disconnect", () => {
      connectedUsers.delete(currentUserId);
      console.log(`Usuario ${currentUserId} desconectado.`);
    });

    // Evento para unirse a una conversación
    socket.on("joinConversation", async (friendId) => {
      console.log("Evento 'joinConversation' recibido. Friend ID:", friendId);

      try {
        const currentUser = await Usuario.findById(currentUserId);
        const friend = await Usuario.findById(friendId);

        if (!currentUser || !friend) {
          console.error("Uno o ambos usuarios no existen.");
          return socket.emit("error", "Usuarios no encontrados.");
        }

        // Convertir los IDs a ObjectId antes de usarlos en la consulta
        const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
        const friendObjectId = new mongoose.Types.ObjectId(friendId);

        // Buscar o crear conversación
        let conversation = await Conversation.findOne({
          participants: { $all: [currentUserObjectId, friendObjectId] },
        }).populate({
          path: "messages",
          populate: [
            { path: "sender", select: "name avatar" },
            { path: "recipient", select: "name avatar" },
          ],
        });

        if (!conversation) {
          conversation = new Conversation({
            participants: [currentUserObjectId, friendObjectId],
            messages: [],
            lastMessage: "",
          });
          await conversation.save();

          console.log(
            `Nueva conversación creada entre ${currentUserId} y ${friendId}`
          );

          await Usuario.findByIdAndUpdate(currentUserObjectId, {
            $push: { conversations: conversation._id },
          });
          await Usuario.findByIdAndUpdate(friendObjectId, {
            $push: { conversations: conversation._id },
          });
        }

        console.log("Conversación encontrada o creada.");

        // Unir al usuario a la sala
        socket.join(conversation._id);
        socket.emit("conversationJoined", { conversationId: conversation._id });
        socket.emit("previousMessages", conversation.messages);
      } catch (error) {
        console.error(`Error al gestionar la conversación: ${error.message}`);
        socket.emit("error", "Error al gestionar la conversación.");
      }
    });


    // Función para guardar el mensaje en la conversación
    const saveMessage = async (conversation, message) => {
      conversation.messages.push(message); // Agregar el mensaje a la conversación
      //console.log("Mensaje a guardar en la conversación:", message);
      conversation.lastMessage = message.content; // Actualizar el último mensaje
      await conversation.save(); // Guardar los cambios
    };

     // Función para enviar mensajes
     const sendMessage = async (socket, data) => {
      //console.log("Datos recibidos en el servidor:", data);

      const { conversationId, message } = data;

      // Validar los datos
      if (
        !conversationId ||
        !message ||
        !message.sender ||
        !message.recipient ||
        !message.content
      ) {
        console.error(
          "Datos insuficientes para enviar mensaje. Faltan uno o más campos:",
          {
            conversationId,
            message,
          }
        );
        return;
      }

      try {
        // Buscar conversación por ID
        let conversation = await Conversation.findById(conversationId);

        // Si no existe, crear una nueva conversación
        if (!conversation) {
          console.log("La conversación no existe. Creando una nueva.");
          conversation = new Conversation({
            participants: [message.sender, message.recipient],
            messages: [],
            lastMessage: "",
          });
          await conversation.save();
        }

        // Crear el nuevo mensaje
        const newMessage = {
          sender: message.sender,
          recipient: message.recipient,
          content: message.content,
          type: message.type || "text", // Por defecto 'text'
          timestamp: message.timestamp || Date.now(),
        };

        // Guardar el mensaje en la conversación
        await saveMessage(conversation, newMessage);

        // Emitir el mensaje al remitente y al destinatario
        const recipientSocketId = connectedUsers.get(message.recipient);; // Buscar socket del destinatario

        if (recipientSocketId) {
          // Enviar mensaje al destinatario
          socket.to(recipientSocketId).emit("receiveMessage", newMessage);
        } else {
          console.warn(
            `El destinatario ${message.recipient} no está conectado.`
          );
        }

        // Enviar mensaje al remitente (para confirmar)
        socket.emit("receiveMessage", newMessage);

        //console.log("Mensaje enviado correctamente.", newMessage);
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    };

    // Escuchar evento de enviar mensaje
    socket.on("sendMessage", (data) => sendMessage(socket, data));
  });
};

module.exports = socketHandler;
