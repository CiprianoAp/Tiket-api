import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthRequest from "../types/express/index";
import dotenv from 'dotenv';

dotenv.config();

export const auth = (
    req: any = AuthRequest as Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({ message: 'Token de autenticação não fornecido' });

    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        req.user = decoded;
        next();
    } catch (error) {

        return res.status(401).json({ message: 'Token de autenticação inválido' });
    }

} 