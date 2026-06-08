import express from "express";
import { auth } from "../../middleware/auth";
import controllPrivate from "../../controllers/controllPrivate";

const routerPrivate = express.Router();

routerPrivate.get('/private', auth, controllPrivate.private);


export default routerPrivate;