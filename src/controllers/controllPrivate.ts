import { Request, Response } from "express";
import { User } from '../models/modelUser';
import { Ticket } from "../models/modelticket";
import { validarTiket } from "../validations/criarTikets";
import { ComentarioTiket } from "../models/comentarioTiket";

class ControllPrivate {

    //Rota inicial de teste  privada
    public async private(req: Request, res: Response) {

        try {
            return res.status(200).json({ mensagem: 'Acesso permitido a rota privada', user: req.user });
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao acessar rota privada. Impossivel comunicar com servidor' + error });
        }

    }


    //Tudo sobre usuarios
    public async alluser(req: Request, res: Response) {
        try {
            const allUser = await User.find({}, "name email cargo");
            res.status(200).json({ mensagem: "Todos os usuarios", allUser })
        } catch (error) {
            res.status(500).json({ mensagecriadoPorm: 'Impossivel de se conectar com o servidor' });
        }
    }

    //tudo sobre tikets
    public async criarTiket(req: Request, res: Response) {
        try {

            const result = validarTiket.safeParse(req.body);

            if (!result.success) {
                return res.status(401).json({ mensagem: result.error.issues[0]?.message });
            }

            const { titulo, descricao, estado, categoria, criadoPor } = req.body
            const tikets = new Ticket({

                titulo,
                descricao,
                estado,
                categoria,
                criadoPor
            })

            await tikets.save();

            return res.status(201).json({ mensagem: 'Tiket criado com sucesso: ', tikets })

        } catch (error) {
            return res.status(501).json({ mensagem: 'Erro ao criar tiket verifica a sua ligacao de internet porfavor', error });
        }
    }

    //meus tikets
    public async meusTikets(req: Request, res: Response) {
        try {

            const { id_user } = req.body;

            const meusTikets = await Ticket.find({ criadoPor: id_user });

            return res.status(200).json({ mensagem: "Meus Tickets", meusTikets });

        } catch (error) {

            return res.status(501).json({ mensagem: "Erro ao carregar seus tikets", error });
        }
    }

    //ver um tiket especifico
    public async verTiket(req: Request, res: Response){
        try {

            const { id_tiket } = req.body;
            const tiket = await Ticket.findById({_id: id_tiket});
          return  res.status(200).json({ mensagem: "Tiket encontrado", tiket })

        }catch(error){
           return res.status(500).json({ mensagem: "Erro ao encontrar tiket", error })
        }
    }

    //Adicionar comentario no tiket
    public async comentarTiket(req: Request, res: Response){

        const { id_usuario, id_tiket, mensagem } = req.body;
        try{

            const tiket = await Ticket.findById({_id: id_tiket});

            if(!tiket){
                return res.status(404).json({ mensagem: "Tiket não encontrado" });
            }   

            const usuario = await User.findById({_id: id_usuario});

            if(!usuario){
                return res.status(404).json({ mensagem: "Usuario não encontrado" });
            }
            const comentario = new ComentarioTiket({
                tiket: id_tiket,
                utilizador: id_usuario,
                mensagem
            })

            await comentario.save();

            return res.status(201).json({mensagem: "Comentario adicionado com sucesso", comentario })

        }catch(error){
            return res.status(501).json({ mensagem: "Erro ao adicionar comentario", error })
        }
    }

    //Verificar comentarios de um tiket
    public async verComentariosTiket(req: Request, res: Response){ 
        try{

            const { id_tiket } = req.body;
            const comentarios = await ComentarioTiket.find({tiket: id_tiket}).populate('utilizador', 'name').populate('tiket', 'titulo descricao estado categoria').sort({ createdAt: -1 });
            res.json({ mensagem: "Comentarios do tiket", comentarios });
        }catch(error){
            res.status(500).json({ mensagem: "Erro ao carregar comentarios do tiket", error });
        }
    }

    public async atribuicaoTiket(req: Request, res: Response){
        try{
            const { id_tiket, id_usuario } = req.body;

            const tiket = await Ticket.findById({_id: id_tiket});

            if(!tiket){
                return res.status(404).json({ mensagem: "Tiket não encontrado" });
            }

            const usuario = await User.findById({_id: id_usuario});

            if(!usuario){
                return res.status(404).json({ mensagem: "Usuario não encontrado" });
            }

                //Atribuir o tiket para o usuario
                tiket.atribuidoPara = id_usuario;
                await tiket.save();
    
                return res.status(200).json({ mensagem: "Tiket atribuido com sucesso", tiket })
        }catch(error){
            return res.status(500).json({ mensagem: "Erro ao atribuir tiket", error })
        }
    }
}

export default new ControllPrivate();