import z from 'zod';

const validarTiket = z.object({
    titulo: z.string()
        .min(7, "Titulo: deve terno minio 7 caracteres")
        .max(40, "Titulo: deve ter no maximo 40 caracteres"),
    descricao: z.string()
        .min(40, "Descricao: deve terno minio 40 caracteres")
        .max(255, "Titulo: deve ter no maximo 255 caracteres"),
    estado: 
        z.enum(["ABERTO","EM_ANALISE","EM_ATENDIMENTO","AGUARDANDO_CLIENTE","RESOLVIDO","FECHADO","REABERTO"]),   
    categoria: 
        z.enum(["HARDWARE","SOFTWARE","REDE","EMAIL","IMPRESSORA","ACESSO","OUTROS"]),
    criadoPor: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "ID inválido")
});

export { validarTiket }