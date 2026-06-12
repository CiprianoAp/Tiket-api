import mongoose, { Types, Schema } from "mongoose";

const anenxoSchema = new mongoose.Schema({
    tiket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    nomeFicheiro: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    }

})

export const Anexo = mongoose.model("Anexo", anenxoSchema);