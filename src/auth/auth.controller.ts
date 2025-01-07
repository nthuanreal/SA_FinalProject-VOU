import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthDTO, UserDTO } from 'src/DTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authDTO: AuthDTO ) {
    // required implement handle error and verification here
    const user = await this.authService.register(authDTO);
    return this.authService.login(user);
  }

  @Post('login')
  async login(@Body() authDTO: AuthDTO ) {
    
    const user = await this.authService.validateUser(authDTO);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Req() req: any) {
    // console.log(req.user);
    return req.user;
  }
}
