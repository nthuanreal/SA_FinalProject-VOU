import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
export declare class JwtAuthGuard implements CanActivate {
    private jwtService;
    private dbService;
    constructor(jwtService: JwtService, dbService: DatabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
