import express from 'express';
import controllPublic from '../../controllers/controllPublic';

const routterPublic = express.Router();

//Rota para endpoint público inicial
routterPublic.get('/', controllPublic.principal);
//Criar para endpoint de criação de usuário
routterPublic.post('/criar-usuario', controllPublic.criarUsuario);
//Criar para endpoint de login
routterPublic.post('/login', controllPublic.login);

export default routterPublic;