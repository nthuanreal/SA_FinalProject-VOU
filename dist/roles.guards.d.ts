import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuard implements CanActivate {
    private roles;
    constructor(roles: string[]);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
