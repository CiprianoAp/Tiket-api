import exporess from "express";
import { Request, Response } from "express";

class ControllPrivate {

    public async private(req: Request, res: Response) {

        try {
            return res.status(200).json({ mensagem: 'Acesso permitido a rota privada', user: req.user });
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao acessar rota privada. Impossivel comunicar com servidor' + error });
        }

    }
}

export default new ControllPrivate();