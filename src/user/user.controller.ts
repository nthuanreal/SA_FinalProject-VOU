import { 
  Controller, 
  UseGuards, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  Req, 
  BadRequestException 
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles.guards';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Admin-only routes: ban, unban, getUserList
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(JwtAuthGuard)
  @Put(':id/ban')
  async banUser(@Param('id') id: number) {
    return this.userService.ban(id);
  }
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(JwtAuthGuard)
  @Put(':id/unban')
  async unbanUser(@Param('id') id: number) {
    return this.userService.unban(id);
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(JwtAuthGuard)
  @Put('/set-role')
  async setRole(
    @Body('id') id: number,
    @Body('newRole') newRole: string,
  ) {
    return this.userService.setRole(id, newRole);
  }
  // get user list
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getList(){
    return this.userService.getAllUser();
  }



  //change password
  @UseGuards(JwtAuthGuard)
  @Put('/change-password')
  async changePassword(
    @Body('password') password: string,
    @Body('newPassword') newPassword: string,
    @Req() req: any,
  ) {
    return this.userService.changePassword(req.user.id, password, newPassword);
  }

  //edit profile (username, password)
  @UseGuards(JwtAuthGuard)
  @Put('/edit-profile')
  async editProfile(
    @Body('username') newUsername: string,
    @Body('email') newEmail: string,
    @Req() req: any,
  ) {
    return this.userService.editProfile(req.user.id,newUsername, newEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile( @Req() req: any,){
    return this.userService.getUserProfile(req.id)
  }

  @Get('/')
  async getAll(){
    return this.userService.getAllUser();
  }
}
