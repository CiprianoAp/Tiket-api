"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
class PermissionService {
    static hasRole(cargo, rolesPermitidos) {
        return rolesPermitidos.includes(cargo);
    }
}
exports.PermissionService = PermissionService;
//# sourceMappingURL=PermissionService.js.map