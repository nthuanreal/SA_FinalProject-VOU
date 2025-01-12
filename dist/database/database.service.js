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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const bcrypt = require("bcryptjs");
require('dotenv').config();
let DatabaseService = class DatabaseService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findAll() {
        return this.userRepository.find({
            order: {
                id: 'ASC',
            },
        });
    }
    findByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    findByUserID(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    create(user) {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
    update(id, user) {
        return this.userRepository.update(id, user);
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
    async checkDatabase() {
        const client = new pg_1.Client({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
        });
        const dbName = process.env.DB_NAME || 'user_service';
        try {
            await client.connect();
            const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
            if (res.rowCount === 0) {
                await client.query(`CREATE DATABASE ${dbName}`);
                console.log(`Database "${dbName}" đã được tạo thành công!`);
            }
            else {
                console.log(`Database "${dbName}" đã tồn tại.`);
            }
        }
        catch (error) {
            console.error('Lỗi khi kiểm tra/tạo database:', error);
        }
        finally {
            await client.end();
        }
    }
    async seedDatabase() {
        const existingUsers = await this.userRepository.find();
        if (existingUsers.length > 0) {
            console.log('Database already seeded.');
            return;
        }
        const zero = 0;
        const hashedPassword = await bcrypt.hash("password123", 10);
        const sampleUsers = [
            { username: 'Alice', email: 'alice@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
            { username: 'Bob', email: 'bob@example.com', password: hashedPassword, role: 'admin', partner_id: zero, isActive: true },
            { username: 'Charlie', email: 'charlie@example.com', password: hashedPassword, role: 'partner', partner_id: 1001, isActive: false },
            { username: 'Daisy', email: 'daisy@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
            { username: 'Edward', email: 'edward@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
            { username: 'Fiona', email: 'fiona@example.com', password: hashedPassword, role: 'partner', partner_id: 1001, isActive: true },
            { username: 'George', email: 'george@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
            { username: 'Hannah', email: 'hannah@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
            { username: 'Ivan', email: 'ivan@example.com', password: hashedPassword, role: 'partner', partner_id: 1002, isActive: false },
            { username: 'Julia', email: 'julia@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
        ];
        await this.userRepository.save(sampleUsers);
        console.log('Database seeded with 10 sample users.');
    }
    async onApplicationBootstrap() {
        await this.checkDatabase();
        await this.seedDatabase();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DatabaseService);
//# sourceMappingURL=database.service.js.map