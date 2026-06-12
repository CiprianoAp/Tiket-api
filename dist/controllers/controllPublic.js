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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelUser_1 = require("../models/modelUser");
const cadastrarUser_1 = require("../validations/cadastrarUser");
const login_1 = require("../validations/login");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
                    return res.status(401).json({
                        error: (_a = result.error.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                    });
                }
                const { name, email, password, cargo } = req.body;
                //Verificar se o email já existe no banco de dados
                const emailExistente = yield modelUser_1.User.findOne({ email });
                if (emailExistente) {
                    return res.status(409).json({ mensagem: 'Email já cadastrado' });
                }
                //Hash da senha para segurança convertendo a senha em hash para não armazenar a senha em texto puro no banco de dados, isso é uma prática de segurança importante para proteger as informações dos usuários caso o banco de dados seja comprometido.
                const senhaHash = yield bcryptjs_1.default.hash(password, 10);
                const novoUsuario = new modelUser_1.User({ name, email, password: senhaHash, cargo });
                yield novoUsuario.save();
                return res.status(201).json({ mensagem: 'Usuario criado com sucesso', usuario: novoUsuario });
            }
            catch (error) {
                return res.status(500).json({ mensagem: 'Erro ao criar usuario impossivel comunicar servidor' + error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                //Validacao login
                const result = login_1.loginShema.safeParse(req.body);
                //Mostrar os erros da validacao login caso existir
                if (!result.success) {
                    return res.status(401).json({
                        error: (_a = result.error.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                    });
                }
                const { email, password } = req.body;
                const usuario = yield modelUser_1.User.find({ email });
                const senhaValida = yield bcryptjs_1.default.compare(password, usuario[0].password);
                if (!usuario) {
                    return res.status(404).json({ mensagem: 'Usuário ou senha inválida' });
                }
                if (!senhaValida) {
                    return res.status(404).json({ mensagem: 'Usuário ou senha inválida' });
                }
                //Usuário autenticado, gerar token JWT
                const token = jsonwebtoken_1.default.sign({ id: usuario[0]._id, email: usuario[0].email, cargo: usuario[0].cargo }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ mensagem: 'Usuário logado com sucesso.', token });
            }
            catch (error) {
                return res.status(500).json({ mensagem: 'Erro ao fazer login. Impossivel comunicar com servidor' + error });
            }
        });
    }
}
exports.default = new ControllPublic();
//# sourceMappingURL=controllPublic.js.map