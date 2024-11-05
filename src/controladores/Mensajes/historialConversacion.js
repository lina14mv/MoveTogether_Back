const Conversacion = require('../../modelos/conversacion');
const Mensaje = require('../../modelos/mensaje');
const mongoose = require('mongoose');

exports.historialConversacion = async (req, res) => {
    try {
        const { userId } = req.params;
    
        const conversacion = await Conversacion.find({ participants: userId })
            .populate('participants', 'name') // Para obtener los nombres de los participantes
            .populate('lastMessage'); // Para obtener el último mensaje de la conversación
        
        res.status(200).json(conversacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el historial de conversaciones.' });
    }
};