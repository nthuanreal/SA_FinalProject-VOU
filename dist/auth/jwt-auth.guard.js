"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../database/database.service");
require('dotenv').config();
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService, dbService) {
        this.jwtService = jwtService;
        this.dbService = dbService;
    }
    ;
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.headers.authorization.split(' ')[1];
            if (!token) {
                throw new common_1.ForbiddenException('Please provide access token');
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_KEY,
            });
            const user = await this.dbService.findByUserID(payload.id);
            if (!user) {
                throw new common_1.BadRequestException("User not belong to token!");
            }
            const { password, isActive, ...userWithoutPassword } = user;
            request.user = userWithoutPassword;
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid token or expired');
        }
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, database_service_1.DatabaseService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map