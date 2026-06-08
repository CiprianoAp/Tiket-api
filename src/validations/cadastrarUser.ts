import { z } from 'zod';

const useShema = z.object({

    name: z.string()
        .min(6, 'Nome: é deve conter no mínimo 6 caracteres')
        .max(30, 'Nome: deve conter no máximo 30 caracteres'),
    email: z.string()
        .email('Formato de email inválido')
        .min(6, 'Email: deve conter no mínimo 6 caracteres')
        .max(30, 'Email: deve conter no máximo 30 caracteres'),
    password: z.string()
        .min(6, 'Password deve conter no mínimo 6 caracteres')
        .max(30, 'Password deve conter no máximo 30 caracteres')
        .regex(/[A-Z]/, "A senha deve conter pelomenos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelomenos uma letra minúscula")
        .regex(/[0-9]/, "A senha deve conter pelomenos um número")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelomenos um caractere especial"),
    cargo: z.enum(['admin', 'agente', 'cliente', 'user'])
        .optional(),

});

export { useShema };