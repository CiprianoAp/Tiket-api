"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const controllPrivate_1 = __importDefault(require("../../controllers/controllPrivate"));
const controllerTiket_1 = __importDefault(require("../../controllers/controllerTiket"));
const permitir_1 = require("../../middleware/permitir");
const roles_1 = require("../../constants/roles");
const routerPrivate = express_1.default.Router();
routerPrivate.get('/private', auth_1.auth, controllPrivate_1.default.private);
routerPrivate.get('/todos-usuarios', auth_1.auth, controllPrivate_1.default.alluser);
routerPrivate.post('/criar-tiket', auth_1.auth, (0, permitir_1.permitir)(roles_1.Roles.ADMINISTRADOR, roles_1.Roles.CLIENTE, roles_1.Roles.CLIENTE, roles_1.Roles.USER), controllerTiket_1.default.criarTiket);
routerPrivate.get('/meus-tikets', auth_1.auth, (0, permitir_1.permitir)(roles_1.Roles.ADMINISTRADOR, roles_1.Roles.CLIENTE, roles_1.Roles.CLIENTE, roles_1.Roles.USER), controllerTiket_1.default.meusTikets);
//Rota nao atribuida no Postman
routerPrivate.get('/ver-tiket', auth_1.auth, controllerTiket_1.default.verTiket);
routerPrivate.post('/comentar-tiket', auth_1.auth, controllerTiket_1.default.comentarTiket);
routerPrivate.get('/ver-comentarios-tiket', auth_1.auth, controllerTiket_1.default.verComentariosTiket);
routerPrivate.post('/atribuir-tiket', auth_1.auth, (0, permitir_1.permitir)(roles_1.Roles.ADMINISTRADOR), controllerTiket_1.default.atribuicaoTiket);
exports.default = routerPrivate;
//# sourceMappingURL=routerPrivate.js.map