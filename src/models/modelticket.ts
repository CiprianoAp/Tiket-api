import mongoose from "mongoose";
import { Schema } from "mongoose";

const ticketSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: {type: String, required: true },
    estado: {type: String, enum:["ABERTO","EM_ANALISE","EM_ATENDIMENTO","AGUARDANDO_CLIENTE","RESOLVIDO","FECHADO","REABERTO"], default: "ABERTO"},
    categoria: {type: String, enum:["HARDWARE","SOFTWARE","REDE","EMAIL","IMPRESSORA","ACESSO","OUTROS"], default: "OUTROS"},
    criadoPor: { type: Schema.Types.ObjectId,ref: "User",required: true },
    atribuidoPara: {type: Schema.Types.ObjectId, ref: "User"}
},{timestamps: true})

export const Ticket = mongoose.model('Ticket', ticketSchema)