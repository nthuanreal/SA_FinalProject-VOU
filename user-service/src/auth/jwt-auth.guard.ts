import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
require('dotenv').config();
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private dbService: DatabaseService) { };
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
             //get token
        const token = request.headers.authorization.split(' ')[1];
        // console.log("jwt auth guard: token = ", token)
        if (!token) {
            throw new ForbiddenException('Please provide access token');
        }
        // verify token
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_KEY,
        })
        // console.log("jwt auth guard: payload = ", payload)

        //
        const user = await this.dbService.findByUserID(payload.id);
        if (!user) {
            throw new BadRequestException("User not belong to token!")
        }
        // console.log("jwt auth guard: user = ", user)
        const { password,isActive, ...userWithoutPassword }=user;
        //bind user to request
        request.user = userWithoutPassword;
        } catch (error) {
            throw new ForbiddenException('Invalid token or expired')
        }
        return true;
    }
}
