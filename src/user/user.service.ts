import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    private readonly dbService: DatabaseService,
  ) { }
  //all roles(admin,partner,user)
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
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const existingUser = await this.dbService.findByUsername(newUsername);
    if (existingUser && user.id !== existingUser.id) {
      throw new BadRequestException('Username is already taken.');
    }
    const existingEmail = await this.dbService.findByEmail(newEmail);
    if (existingEmail && user.id !== existingEmail.id) {
      throw new BadRequestException('Email is already in use.');
    }

    return this.dbService.update(userId, { username: newUsername, email: newEmail });
  }
  async getUserProfile(userId: number) {
    const data = await this.dbService.findByUserID(userId);
    const { password, isActive, ...user } = data;
    return user;
  }
  //admin
  async editUserProfile(userId: number, newUsername: string, newEmail: string, newRole: string, newIsActive: boolean) {
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const existingUser = await this.dbService.findByUsername(newUsername);
    if (existingUser && user.id != existingUser.id) {
      throw new BadRequestException('Username is already taken.');
    }
    const existingEmail = await this.dbService.findByEmail(newEmail);
    if (existingEmail && user.id != existingEmail.id) {
      throw new BadRequestException('Email is already in use.');
    }

    if (!['admin', 'user', 'partner'].includes(newRole)) {
      throw new Error('Invalid role');
    }
    return this.dbService.update(userId, { username: newUsername, email: newEmail, isActive: newIsActive, role: newRole });
  }
  async getUserInfo(userId: number) {
    const data = await this.dbService.findByUserID(userId);
    const { password, ...user } = data;
    return user;
  }
  async getAllUser() {
    const data = await this.dbService.findAll();
    const Users = data.map(({ password, ...rest }) => rest);
    return Users;
  }
}
