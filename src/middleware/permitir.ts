import { Response, NextFunction } from "express";
import { AuthRequest } from '../types/AuthRequest';
import { PermissionService } from '../services/PermissionService';

export const permitir = (...roles: string[]) => {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        if (!req.user) {
            return res.status(409).json({ mensagem: "usuario nao autenticado" });
        }

        const autorizado = PermissionService.hasRole(
            req.user.cargo,
            roles
        );

        if (!autorizado) {
            return res.status(403).json({ mensagem: "Sem permisao" });
        }
        next();
    }
}