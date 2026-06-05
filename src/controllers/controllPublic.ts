import type { Request, Response } from 'express';
import { User } from '../models/modelUser';
import { z } from 'zod';

class ControllPublic {

  public async principal(req: Request, res: Response): Promise<void> {

    res.status(200).json({ message: 'This is a public endpoint at Home.' });

  }

  //Cadastrar usuario
  public async criarUsuario(req: Request, res: Response): Promise<Response> {

    try {
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
          .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
          .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
          .regex(/[0-9]/, "A senha deve conter pelo menos um número")
          .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
        cargo: z.enum(['admin', 'agente', 'cliente', 'user'])
          .optional(),
      });

      const result = useShema.safeParse(req.body);

      //Mostra os erros de validação caso haja
      if (!result.success) {
        return res.status(400).json({
          error: result.error.issues[0]?.message
        });
      }

      const { name, email, password, cargo } = req.body;
      const novoUsuario = new User({ name, email, password, cargo });

      await novoUsuario.save();
      return res.status(201).json({ mensagem: 'Usuario criado com sucesso', usuario: novoUsuario });

    } catch (error) {

      return res.status(500).json({ mensagem: 'Erro ao criar usuario impossivel comunicar servidor' + error });

    }
  }

}

export default new ControllPublic();
