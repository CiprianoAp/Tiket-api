"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permitir = void 0;
const PermissionService_1 = require("../services/PermissionService");
const permitir = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(409).json({ mensagem: "usuario nao autenticado" });
        }
        const autorizado = PermissionService_1.PermissionService.hasRole(req.user.cargo, roles);
        if (!autorizado) {
            return res.status(403).json({ mensagem: "Sem permisao" });
        }
        next();
    };
};
exports.permitir = permitir;
//# sourceMappingURL=permitir.js.map