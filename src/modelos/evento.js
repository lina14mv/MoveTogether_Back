const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = new Schema(
    {
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true,
        },
        time:{
            type: String,
            required: true,
        },
        destination:{
            type: String,
            required: true,
        },
        participants: [
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
    });

module.exports = mongoose.model("Evento", EventoSchema);