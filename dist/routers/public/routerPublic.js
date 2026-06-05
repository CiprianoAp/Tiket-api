"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllPublic_1 = __importDefault(require("../../controllers/controllPublic"));
const routterPublic = express_1.default.Router();
//Rota para endpoint público inicial
routterPublic.get('/', controllPublic_1.default.principal);
//Criar para endpoint de criação de usuário
routterPublic.post('/criar-usuario', controllPublic_1.default.criarUsuario);
exports.default = routterPublic;
//# sourceMappingURL=routerPublic.js.map