import express from "express";
import { auth } from "../../middleware/auth";
import controllPrivate from "../../controllers/controllPrivate";

const routerPrivate = express.Router();

routerPrivate.get('/private', auth, controllPrivate.private);
routerPrivate.get('/todos-usuarios', auth,controllPrivate.alluser);
routerPrivate.post('/criar-tiket', auth, controllPrivate.criarTiket);
routerPrivate.get('/meus-tikets', auth, controllPrivate.meusTikets);
routerPrivate.get('/ver-tiket', auth, controllPrivate.verTiket);
routerPrivate.post('/comentar-tiket', auth, controllPrivate.comentarTiket);
routerPrivate.get('/ver-comentarios-tiket', auth, controllPrivate.verComentariosTiket);


export default routerPrivate;