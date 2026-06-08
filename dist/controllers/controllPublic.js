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
const cadastrarUser_1 = require("../validations/cadastrarUser");
class ControllPublic {
    principal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: 'This is a public endpoint at Home.' });
        });
    }
    //Cadastrar usuario
    criarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                //Depois devo levar esse codigo fora daqui desta função para apenas importar ele aqui, para deixar o código mais limpo e organizado, mas por enquanto deixarei aqui mesmo para facilitar a construção do endpoint
                const result = cadastrarUser_1.useShema.safeParse(req.body);
                //Mostra os erros de validação caso haja
                if (!result.success) {
                    return res.status(400).json({
                        error: (_a = result.error.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                    });
                }
                const { name, email, password, cargo } = req.body;
                const novoUsuario = new modelUser_1.User({ name, email, password, cargo });
                yield novoUsuario.save();
                return res.status(201).json({ mensagem: 'Usuario criado com sucesso', usuario: novoUsuario });
            }
            catch (error) {
                return res.status(500).json({ mensagem: 'Erro ao criar usuario impossivel comunicar servidor' + error });
            }
        });
    }
}
exports.default = new ControllPublic();
//# sourceMappingURL=controllPublic.js.map