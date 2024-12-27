import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
require('dotenv').config();
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private roles: string[] ){};
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.roles.includes(request.user.role.toLowerCase());
    }
}
