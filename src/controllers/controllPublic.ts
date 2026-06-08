import type { Request, Response } from 'express';
import { User } from '../models/modelUser';
import { useShema } from '../validations/cadastrarUser';
import bcrypt from 'bcryptjs';


class ControllPublic {

  public async principal(req: Request, res: Response): Promise<void> {

    res.status(200).json({ message: 'This is a public endpoint at Home.' });

  }

  //Cadastrar usuario
  public async criarUsuario(req: Request, res: Response): Promise<Response> {

    try {

      //Depois devo levar esse codigo fora daqui desta função para apenas importar ele aqui, para deixar o código mais limpo e organizado, mas por enquanto deixarei aqui mesmo para facilitar a construção do endpoint
      const result = useShema.safeParse(req.body);

      //Mostra os erros de validação caso haja
      if (!result.success) {
        return res.status(400).json({
          error: result.error.issues[0]?.message
        });
      }

      const { name, email, password, cargo } = req.body;
      const senhaHash = await bcrypt.hash(password, 10);

      const novoUsuario = new User({ name, email, password: senhaHash, cargo });

      await novoUsuario.save();
      return res.status(201).json({ mensagem: 'Usuario criado com sucesso', usuario: novoUsuario });

    } catch (error) {

      return res.status(500).json({ mensagem: 'Erro ao criar usuario impossivel comunicar servidor' + error });

    }
  }

}

export default new ControllPublic();
