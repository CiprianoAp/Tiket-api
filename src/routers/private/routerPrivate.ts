import express from "express";
import { auth } from "../../middleware/auth";
import controllPrivate from "../../controllers/controllPrivate";

const routerPrivate = express.Router();

routerPrivate.get('/private', auth, controllPrivate.private);
routerPrivate.get('/todos-usuarios', auth,controllPrivate.alluser);
routerPrivate.post('/criar-tiket', auth, controllPrivate.criarTiket);


export default routerPrivate;