import express from 'express';
import routerPublic from './public/routerPublic';
import routerPrivate from './private/routerPrivate';


const router = express.Router();

router.use('/', routerPublic);
router.use('/', routerPrivate);

export default router;