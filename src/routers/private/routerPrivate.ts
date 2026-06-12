import express from "express";
import { auth } from "../../middleware/auth";
import controllPrivate from "../../controllers/controllPrivate";
import contolltiketes from "../../controllers/controllerTiket";
import { permitir } from "../../middleware/permitir";
import { Roles } from "../../constants/roles"

const routerPrivate = express.Router();

routerPrivate.get('/private', auth, controllPrivate.private);
routerPrivate.get('/todos-usuarios', auth, controllPrivate.alluser);
routerPrivate.post('/criar-tiket', auth , permitir(Roles.ADMINISTRADOR, Roles.CLIENTE, Roles.CLIENTE, Roles.USER), contolltiketes.criarTiket);
routerPrivate.get('/meus-tikets', auth, permitir(Roles.ADMINISTRADOR, Roles.CLIENTE, Roles.CLIENTE, Roles.USER),contolltiketes.meusTikets);

//Rota nao atribuida no Postman
routerPrivate.get('/ver-tiket', auth, contolltiketes.verTiket);
routerPrivate.post('/comentar-tiket', auth, contolltiketes.comentarTiket);
routerPrivate.get('/ver-comentarios-tiket', auth, contolltiketes.verComentariosTiket);
routerPrivate.post('/atribuir-tiket', auth, permitir(Roles.ADMINISTRADOR),contolltiketes.atribuicaoTiket);


export default routerPrivate;