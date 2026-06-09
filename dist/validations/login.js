"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginShema = void 0;
const zod_1 = __importDefault(require("zod"));
const loginShema = zod_1.default.object({
    email: zod_1.default.string("Insera o mail")
        .min(1, "Email: nao pode ser vazio")
        .email("Formato de email invalido"),
    password: zod_1.default.string("Insira a senha")
        .min(1, "Senha: nao pode ser vazia")
});
exports.loginShema = loginShema;
//# sourceMappingURL=login.js.map