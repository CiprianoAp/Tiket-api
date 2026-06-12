export class PermissionService {
    static hasRole(
        cargo: string,
        rolesPermitidos: string[]
    ): boolean{
        return rolesPermitidos.includes(cargo);
    }
}