import z, { email } from 'zod'

const loginShema = z.object({
    email: z.string("Insera o mail")
        .min(1, "Email: nao pode ser vazio")
        .email("Formato de email invalido"),
    password: z.string("Insira a senha")
        .min(1, "Senha: nao pode ser vazia")
}) 

export  { loginShema };