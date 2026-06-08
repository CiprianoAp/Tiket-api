import express from "express";
import controllPrivate from "../../controllers/controllPrivate";

const routerPrivate = express.Router();

routerPrivate.get('/private',  controllPrivate.private);


export default routerPrivate;