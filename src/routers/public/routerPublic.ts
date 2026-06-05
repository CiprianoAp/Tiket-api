import express from 'express';
import controllPublic from '../../controllers/controllPublic';

const routterPublic = express.Router();

routterPublic.get('/', controllPublic.principal);

export default routterPublic;