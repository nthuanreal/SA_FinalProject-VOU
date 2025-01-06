import { 
  Controller, 
  UseGuards, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  Req, 
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles.guards';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //// Admin-only
  // get user list
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getList(){
    return this.userService.getAllUser();
  } 
  //manage user information (username, email,role,active status)
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(JwtAuthGuard)
  @Put('/edit-user')
  async editUser(
    @Body('id') id: number,
    @Body('username') newUsername: string,
    @Body('email') newEmail: string,
    @Body('Role') newRole: string,
    @Body('partner_id') newPartnerid,
    @Body('isActive') newIsActive: boolean,

  ) {

    return this.userService.editUserProfile(id,newUsername, newEmail, newRole, newPartnerid, newIsActive);
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
  //edit profile (username, email)
  @UseGuards(JwtAuthGuard)
  @Put('/edit-profile')
  async editProfile(
    @Body('username') newUsername: string,
    @Body('email') newEmail: string,
    @Req() req: any,
  ) {
    return this.userService.editProfile(req.user.id,newUsername, newEmail);
  }
  //user get their own profile
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile( @Req() req: any,){
    return this.userService.getUserProfile(req.user.id)
  }

  //// API (temp)
  //get all users information
  @Get('/')
  async getAll(){
    return this.userService.getAllUser();
  }
  // get information of a specific user
  @Get('/:id')
  async getUser(@Param('id') id: number){
    return this.userService.getUserInfo(id);
  }

  @Get('partner_id/:id')
  async getUserPartnerID(@Param('id') id: number){
    return this.userService.getUserPartnerID(id);
  }
}
