import type { Request, Response } from 'express';
import { User } from '../models/modelUser';
import { useShema } from '../validations/cadastrarUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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
      //Verificar se o email já existe no banco de dados
      const emailExistente = await User.findOne({ email });

      if (emailExistente) {
        return res.status(409).json({ mensagem: 'Email já cadastrado' });
      }

      //Hash da senha para segurança convertendo a senha em hash para não armazenar a senha em texto puro no banco de dados, isso é uma prática de segurança importante para proteger as informações dos usuários caso o banco de dados seja comprometido.
      const senhaHash = await bcrypt.hash(password, 10);

      const novoUsuario = new User({ name, email, password: senhaHash, cargo });

      await novoUsuario.save();
      return res.status(201).json({ mensagem: 'Usuario criado com sucesso', usuario: novoUsuario });

    } catch (error) {

      return res.status(500).json({ mensagem: 'Erro ao criar usuario impossivel comunicar servidor' + error });

    }
  }


  public async login(req: Request, res: Response): Promise<Response> {
    try {

      const { email, password } = req.body;
      const usuario = await User.find({ email });
      const senhaValida = await bcrypt.compare(password, usuario[0].password)

      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário ou senha inválida' })
      }

      if (!senhaValida) {
        return res.status(404).json({ mensagem: 'Usuário ou senha inválida' })
      }

      //Usuário autenticado, gerar token JWT
      const token = jwt.sign(

        {id: usuario[0]._id, email: usuario[0].email}, process.env.JWT_SECRET as string, { expiresIn: '1h' }
        
      );

      return res.status(200).json({ mensagem: 'Usuário logado com sucesso.', token});

    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro ao fazer login. Impossivel comunicar com servidor' + error });
    }
  }

}

export default new ControllPublic();
