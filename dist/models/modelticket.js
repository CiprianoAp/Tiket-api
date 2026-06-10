"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ticketSchema = new mongoose_1.default.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    estado: { type: String, enum: ["ABERTO", "EM_ANALISE", "EM_ATENDIMENTO", "AGUARDANDO_CLIENTE", "RESOLVIDO", "FECHADO", "REABERTO"], default: "ABERTO" },
    categoria: { type: String, enum: ["HARDWARE", "SOFTWARE", "REDE", "EMAIL", "IMPRESSORA", "ACESSO", "OUTROS"], default: "OUTROS" },
    criadoPor: { type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true },
    atribuidoPara: { type: mongoose_2.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
exports.Ticket = mongoose_1.default.model('Ticket', ticketSchema);
//# sourceMappingURL=modelticket.js.map