import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';

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
    const user = await this.dbService.findByUserID(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if(user.role != "partner") {
      const { password, isActive, partner_id, ...data } = user;
      return data;
    }
    else {
      const { password, isActive, ...data } = user;
      return data;
    }

  }
  //admin
  async editUserProfile(userId: number, newUsername: string, newEmail: string, newRole: string, newPartnerid: number, newIsActive: boolean) {
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
    return this.dbService.update(userId, { username: newUsername, email: newEmail, isActive: newIsActive, partner_id: newPartnerid,role: newRole });
  }
  async getUserInfo(userId: number) {
    const data = await this.dbService.findByUserID(userId);
    if (!data) {
      throw new NotFoundException('User not found.');
    }
    const { password, ...user } = data;
    return user;
  }
  async getUserPartnerID(id: number) {
    const data = await this.dbService.findByUserID(id);
    if (!data) {
      throw new NotFoundException('User not found.');
    }
    if (data.role != "partner"){
      return {partner_id: 0};
    }
    return {partner_id: data.partner_id};
  }

  async getAllUser() {
    try {
      const data = await this.dbService.findAll();
      const Users = data.map(({ password, ...rest }) => rest);
      return Users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Unable to fetch users at this time.');
    }
  }
  
}
