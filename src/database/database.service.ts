import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Client } from 'pg';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

require('dotenv').config();

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  findAll() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
  findByUserID(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }


  create(user: Partial<User>) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
  private async checkDatabase() {
    const client = new Client({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
    });

    const dbName = process.env.DB_NAME || 'user_service';

    try {
      await client.connect();
      const res = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [dbName]
      );

      if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database "${dbName}" đã được tạo thành công!`);
      } else {
        console.log(`Database "${dbName}" đã tồn tại.`);
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra/tạo database:', error);
    } finally {
      await client.end();
    }
  }
  async seedDatabase() {
    // Kiem tra xem co du lieu chua, neu chua thi tao du lieu mau
    const existingUsers = await this.userRepository.find();
    if (existingUsers.length > 0) {
      console.log('Database already seeded.');
      return;
    }
    const zero = 0;
    const hashedPassword = await bcrypt.hash("password123", 10);
    //tao 10 du lieu mau
    const sampleUsers = [
      { username: 'Alice', email: 'alice@example.com', password: hashedPassword, role: 'user', partner_id: zero , isActive: true },
      { username: 'Bob', email: 'bob@example.com', password: hashedPassword, role: 'admin', partner_id: zero, isActive: true },
      { username: 'Charlie', email: 'charlie@example.com', password: hashedPassword, role: 'partner', partner_id:1001, isActive: false },
      { username: 'Daisy', email: 'daisy@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
      { username: 'Edward', email: 'edward@example.com', password: hashedPassword, role: 'user', partner_id: zero , isActive: true },
      { username: 'Fiona', email: 'fiona@example.com', password: hashedPassword, role: 'partner', partner_id: 1001, isActive: true },
      { username: 'George', email: 'george@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
      { username: 'Hannah', email: 'hannah@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
      { username: 'Ivan', email: 'ivan@example.com', password: hashedPassword, role: 'partner', partner_id: 1002, isActive: false },
      { username: 'Julia', email: 'julia@example.com', password: hashedPassword, role: 'user', partner_id: zero, isActive: true },
    ];
    await this.userRepository.save(sampleUsers);
    console.log('Database seeded with 10 sample users.');
  }

  //mount
  async onApplicationBootstrap() {
    await this.checkDatabase();
    await this.seedDatabase();
  }
}






