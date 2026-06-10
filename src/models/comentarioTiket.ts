import mongoose , { Schema }from "mongoose";

const cometarioShema = new mongoose.Schema({
    tiket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    utilizador: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mensagem: {
        type: String,
        required: true
    }
},{timestamps: true});

export const ComentarioTiket = mongoose.model('ComentarioTiket', cometarioShema); 