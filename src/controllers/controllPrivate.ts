import { Request, Response } from "express";
import { User } from '../models/modelUser';
//import { Ticket } from "../models/modelticket";
//import { validarTiket } from "../validations/criarTikets";
//import { ComentarioTiket } from "../models/comentarioTiket";

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

   
}

export default new ControllPrivate();