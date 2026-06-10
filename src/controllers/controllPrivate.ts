import { Request, Response } from "express";
import { User } from '../models/modelUser';
import { Ticket } from "../models/modelticket";
import { validarTiket } from "../validations/criarTikets";

class ControllPrivate {

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

            if(!result.success){
                return res.status(401).json({mensagem: result.error.issues[0]?.message});
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
}

export default new ControllPrivate();