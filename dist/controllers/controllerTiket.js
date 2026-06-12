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
const modelticket_1 = require("../models/modelticket");
const criarTikets_1 = require("../validations/criarTikets");
const comentarioTiket_1 = require("../models/comentarioTiket");
class contolltiketes {
    //tudo sobre tikets
    criarTiket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = criarTikets_1.validarTiket.safeParse(req.body);
                if (!result.success) {
                    return res.status(401).json({ mensagem: (_a = result.error.issues[0]) === null || _a === void 0 ? void 0 : _a.message });
                }
                const { titulo, descricao, estado, categoria, criadoPor } = req.body;
                const tikets = new modelticket_1.Ticket({
                    titulo,
                    descricao,
                    estado,
                    categoria,
                    criadoPor
                });
                yield tikets.save();
                return res.status(201).json({ mensagem: 'Tiket criado com sucesso: ', tikets });
            }
            catch (error) {
                return res.status(501).json({ mensagem: 'Erro ao criar tiket', error });
            }
        });
    }
    //meus tikets
    meusTikets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_user } = req.body;
                const meusTikets = yield modelticket_1.Ticket.find({ criadoPor: id_user });
                return res.status(200).json({ mensagem: "Meus Tickets", meusTikets });
            }
            catch (error) {
                return res.status(501).json({ mensagem: "Erro ao carregar seus tikets", error });
            }
        });
    }
    //ver um tiket especifico
    verTiket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tiket } = req.body;
                const tiket = yield modelticket_1.Ticket.findById({ _id: id_tiket });
                return res.status(200).json({ mensagem: "Tiket encontrado", tiket });
            }
            catch (error) {
                return res.status(500).json({ mensagem: "Erro ao encontrar tiket", error });
            }
        });
    }
    //Adicionar comentario no tiket
    comentarTiket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, id_tiket, mensagem } = req.body;
            try {
                const tiket = yield modelticket_1.Ticket.findById({ _id: id_tiket });
                if (!tiket) {
                    return res.status(404).json({ mensagem: "Tiket não encontrado" });
                }
                const usuario = yield modelUser_1.User.findById({ _id: id_usuario });
                if (!usuario) {
                    return res.status(404).json({ mensagem: "Usuario não encontrado" });
                }
                const comentario = new comentarioTiket_1.ComentarioTiket({
                    tiket: id_tiket,
                    utilizador: id_usuario,
                    mensagem
                });
                yield comentario.save();
                return res.status(201).json({ mensagem: "Comentario adicionado com sucesso", comentario });
            }
            catch (error) {
                return res.status(501).json({ mensagem: "Erro ao adicionar comentario", error });
            }
        });
    }
    //Verificar comentarios de um tiket
    verComentariosTiket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tiket } = req.body;
                const comentarios = yield comentarioTiket_1.ComentarioTiket.find({ tiket: id_tiket }).populate('utilizador', 'name').populate('tiket', 'titulo descricao estado categoria').sort({ createdAt: -1 });
                res.json({ mensagem: "Comentarios do tiket", comentarios });
            }
            catch (error) {
                res.status(500).json({ mensagem: "Erro ao carregar comentarios do tiket", error });
            }
        });
    }
    //Atribui tiket ao tecnico
    atribuicaoTiket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tiket, id_usuario } = req.body;
                const tiket = yield modelticket_1.Ticket.findById({ _id: id_tiket });
                if (!tiket) {
                    return res.status(404).json({ mensagem: "Tiket não encontrado" });
                }
                const usuario = yield modelUser_1.User.findById({ _id: id_usuario });
                if (!usuario) {
                    return res.status(404).json({ mensagem: "Usuario não encontrado" });
                }
                //Atribuir o tiket para o usuario
                tiket.atribuidoPara = id_usuario;
                yield tiket.save();
                return res.status(200).json({ mensagem: "Tiket atribuido com sucesso", tiket });
            }
            catch (error) {
                return res.status(500).json({ mensagem: "Erro ao atribuir tiket", error });
            }
        });
    }
}
exports.default = new contolltiketes();
//# sourceMappingURL=controllerTiket.js.map