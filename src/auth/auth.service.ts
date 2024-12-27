import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDTO,UserDTO } from 'src/DTO';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(authDTO:AuthDTO) {
    const existingUser = await this.dbService.findByUsername(authDTO.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(authDTO.password, 10);
    const newUser = await this.dbService.create({
      username: authDTO.username,
      password: hashedPassword,
    });


    const { password: _, ...userWithoutPassword } = newUser;
    const userDTO = new UserDTO(
      userWithoutPassword.id,
      userWithoutPassword.username,
      userWithoutPassword.email,
      userWithoutPassword.role
    );
    return userDTO;
  }

  async validateUser(authDTO:AuthDTO) {
    const user = await this.dbService.findByUsername(authDTO.username);
    if (!user || !(await bcrypt.compare(authDTO.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if(!user.isActive){
      throw new ForbiddenException('No permission to access this profile!');
    }

    const { password,isActive, ...userWithoutPassword } = user;
    const userDTO = new UserDTO(
      userWithoutPassword.id,
      userWithoutPassword.username,
      userWithoutPassword.email,
      userWithoutPassword.role
    );
    return userDTO;
  }

  async login(userDTO: UserDTO) {
    const payload = { ...userDTO };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


