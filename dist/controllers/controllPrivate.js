"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelUser_1 = require("../models/modelUser");
//import { Ticket } from "../models/modelticket";
//import { validarTiket } from "../validations/criarTikets";
//import { ComentarioTiket } from "../models/comentarioTiket";
class ControllPrivate {
    //Rota inicial de teste  privada
    private(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({ mensagem: 'Acesso permitido a rota privada', user: req.user });
            }
            catch (error) {
                return res.status(500).json({ mensagem: 'Erro ao acessar rota privada. Impossivel comunicar com servidor' + error });
            }
        });
    }
    //Tudo sobre usuarios
    alluser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUser = yield modelUser_1.User.find({}, "name email cargo");
                res.status(200).json({ mensagem: "Todos os usuarios", allUser });
            }
            catch (error) {
                res.status(500).json({ mensagecriadoPorm: 'Impossivel de se conectar com o servidor' });
            }
        });
    }
}
exports.default = new ControllPrivate();
//# sourceMappingURL=controllPrivate.js.map