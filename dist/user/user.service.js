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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.dbService.findByUserID(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Your password is incorrect.');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const res = await this.dbService.update(userId, { password: hashedPassword });
        return res;
    }
    async editProfile(userId, newUsername, newEmail) {
        const user = await this.dbService.findByUserID(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const existingUser = await this.dbService.findByUsername(newUsername);
        if (existingUser && user.id !== existingUser.id) {
            throw new common_1.BadRequestException('Username is already taken.');
        }
        const existingEmail = await this.dbService.findByEmail(newEmail);
        if (existingEmail && user.id !== existingEmail.id) {
            throw new common_1.BadRequestException('Email is already in use.');
        }
        return this.dbService.update(userId, { username: newUsername, email: newEmail });
    }
    async getUserProfile(userId) {
        const user = await this.dbService.findByUserID(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (user.role != "partner") {
            const { password, isActive, partner_id, ...data } = user;
            return data;
        }
        else {
            const { password, isActive, ...data } = user;
            return data;
        }
    }
    async editUserProfile(userId, newUsername, newEmail, newRole, newPartnerid, newIsActive) {
        const user = await this.dbService.findByUserID(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const existingUser = await this.dbService.findByUsername(newUsername);
        if (existingUser && user.id != existingUser.id) {
            throw new common_1.BadRequestException('Username is already taken.');
        }
        const existingEmail = await this.dbService.findByEmail(newEmail);
        if (existingEmail && user.id != existingEmail.id) {
            throw new common_1.BadRequestException('Email is already in use.');
        }
        if (!['admin', 'user', 'partner'].includes(newRole)) {
            throw new Error('Invalid role');
        }
        return this.dbService.update(userId, { username: newUsername, email: newEmail, isActive: newIsActive, partner_id: newPartnerid, role: newRole });
    }
    async getUserInfo(userId) {
        const data = await this.dbService.findByUserID(userId);
        if (!data) {
            throw new common_1.NotFoundException('User not found.');
        }
        const { password, ...user } = data;
        return user;
    }
    async getUserPartnerID(id) {
        const data = await this.dbService.findByUserID(id);
        if (!data) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (data.role != "partner") {
            return { partner_id: 0 };
        }
        return { partner_id: data.partner_id };
    }
    async getAllUser() {
        try {
            const data = await this.dbService.findAll();
            const Users = data.map(({ password, ...rest }) => rest);
            return Users;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Unable to fetch users at this time.');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map