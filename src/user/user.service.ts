import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DatabaseService,
  ) {}


  async getAllUser(){
      const data = await this.dbService.findAll();
      const Users = data.map(({ password, ...rest }) => rest); 
      return Users;
  }
  async getUserProfile(userId: number){
    const data =await this.dbService.findByUserID(userId);
    const {password,isActive,...user} = data; 
    return user;
  }


  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Your password is incorrect.');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const res = await this.dbService.update(userId, { password: hashedPassword });
    return res;
  }

  async editProfile(userId: number, newUsername: string, newEmail: string) {
    const existingUser = await this.dbService.findByUsername(newUsername);
    if (existingUser) {
      throw new BadRequestException('Username is already taken.');
    }
    const existingEmail= await this.dbService.findByEmail(newEmail);
    if (existingEmail) {
      throw new BadRequestException('Email is already in use.');
    }
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return this.dbService.update(userId, {username:newUsername, email: newEmail });
  }

  async setRole(userId: number, newRole: string) {
    if (!['admin', 'user', 'partner'].includes(newRole)) {
      throw new Error('Invalid role');
    }
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.dbService.update(userId, { role: newRole });
  }

  async ban(userId: number) {
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.dbService.update(userId, { isActive: false });
  }

  async unban(userId: number) {
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.dbService.update(userId, { isActive: true });
  }
}
