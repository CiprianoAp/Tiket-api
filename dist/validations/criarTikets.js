"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarTiket = void 0;
const zod_1 = __importDefault(require("zod"));
const validarTiket = zod_1.default.object({
    titulo: zod_1.default.string()
        .min(7, "Titulo: deve terno minio 7 caracteres")
        .max(25, "Titulo: deve ter no maximo 25 caracteres"),
    descricao: zod_1.default.string()
        .min(50, "Descricao: deve terno minio 50 caracteres")
        .max(255, "Titulo: deve ter no maximo 255 caracteres"),
    estado: zod_1.default.enum(["ABERTO", "EM_ANALISE", "EM_ATENDIMENTO", "AGUARDANDO_CLIENTE", "RESOLVIDO", "FECHADO", "REABERTO"]),
    categoria: zod_1.default.enum(["HARDWARE", "SOFTWARE", "REDE", "EMAIL", "IMPRESSORA", "ACESSO", "OUTROS"]),
    criadoPor: zod_1.default
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "ID inválido")
});
exports.validarTiket = validarTiket;
//# sourceMappingURL=criarTikets.js.map