import express from 'express';
import routerPublic from './public/routerPublic';


const router = express.Router();

router.use('/', routerPublic);

export default router;