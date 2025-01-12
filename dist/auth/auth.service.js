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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const DTO_1 = require("../DTO");
const database_service_1 = require("../database/database.service");
let AuthService = class AuthService {
    constructor(dbService, jwtService) {
        this.dbService = dbService;
        this.jwtService = jwtService;
    }
    async register(authDTO) {
        const existingUser = await this.dbService.findByUsername(authDTO.username);
        if (existingUser) {
            throw new common_1.ConflictException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(authDTO.password, 10);
        const newUser = await this.dbService.create({
            username: authDTO.username,
            password: hashedPassword,
        });
        const { password: _, ...userWithoutPassword } = newUser;
        const userDTO = new DTO_1.UserDTO(userWithoutPassword.id, userWithoutPassword.username, userWithoutPassword.email, userWithoutPassword.role);
        return userDTO;
    }
    async validateUser(authDTO) {
        const user = await this.dbService.findByUsername(authDTO.username);
        if (!user || !(await bcrypt.compare(authDTO.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.ForbiddenException('No permission to access this profile!');
        }
        const { password, isActive, ...userWithoutPassword } = user;
        const userDTO = new DTO_1.UserDTO(userWithoutPassword.id, userWithoutPassword.username, userWithoutPassword.email, userWithoutPassword.role);
        return userDTO;
    }
    async login(userDTO) {
        const payload = { ...userDTO };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map