import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
require('dotenv').config();
@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: process.env.JWT_KEY, // .env
    signOptions: { expiresIn: '1h' },
  }), TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule { }
