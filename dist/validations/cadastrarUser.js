"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShema = void 0;
const zod_1 = require("zod");
const useShema = zod_1.z.object({
    name: zod_1.z.string()
        .min(6, 'Nome: é deve conter no mínimo 6 caracteres')
        .max(30, 'Nome: deve conter no máximo 30 caracteres'),
    email: zod_1.z.string()
        .email('Formato de email inválido')
        .min(6, 'Email: deve conter no mínimo 6 caracteres')
        .max(30, 'Email: deve conter no máximo 30 caracteres'),
    password: zod_1.z.string()
        .min(6, 'Password deve conter no mínimo 6 caracteres')
        .max(30, 'Password deve conter no máximo 30 caracteres')
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
    cargo: zod_1.z.enum(['admin', 'agente', 'cliente', 'user'])
        .optional(),
});
exports.useShema = useShema;
//# sourceMappingURL=cadastrarUser.js.map