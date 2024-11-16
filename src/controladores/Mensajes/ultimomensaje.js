const mongoose = require("mongoose");
const Conversation = require("../../modelos/conversation");

const ultimoMensaje = async (userId) => {
  try {
    const result = await Conversation.aggregate([
      // Filtra las conversaciones en las que el usuario es un participante
      { $match: { participants: new mongoose.Types.ObjectId(userId) } },

      // Despliega los mensajes dentro del array
      { $unwind: "$messages" },

      // Agrupa por cada conversación para obtener el último mensaje
      {
        $group: {
          _id: "$_id",
          participants: { $first: "$participants" },
          lastMessage: { $last: "$messages" },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ne: ["$messages.sender", new mongoose.Types.ObjectId(userId)] },
                    { $eq: ["$messages.read", false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },

      // Excluye el propio usuario de la lista de participantes para encontrar al amigo
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          unreadCount: 1,
          friendId: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$participants",
                  as: "participant",
                  cond: { $ne: ["$$participant", new mongoose.Types.ObjectId(userId)] }
                }
              },
              0
            ]
          }
        }
      },

      // Realiza un lookup para obtener la información del amigo desde la colección de usuarios
      {
        $lookup: {
          from: "Usuarios",
          localField: "friendId",
          foreignField: "_id",
          as: "friend"
        }
      },

      // Desenrolla el array de amigos para tener un solo documento
      { $unwind: "$friend" },

      // Selecciona los campos relevantes de la respuesta
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          unreadCount: 1,
          friendName: "$friend.fullname",
          friendAvatar: "$friend.avatar"
        }
      }
    ]);

    return result;
  } catch (error) {
    console.error("Error al obtener el resumen de la conversación:", error);
    throw error;
  }
};

module.exports = ultimoMensaje;