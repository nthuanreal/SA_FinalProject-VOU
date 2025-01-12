import { JwtService } from '@nestjs/jwt';
import { AuthDTO, UserDTO } from 'src/DTO';
import { DatabaseService } from 'src/database/database.service';
export declare class AuthService {
    private readonly dbService;
    private readonly jwtService;
    constructor(dbService: DatabaseService, jwtService: JwtService);
    register(authDTO: AuthDTO): Promise<UserDTO>;
    validateUser(authDTO: AuthDTO): Promise<UserDTO>;
    login(userDTO: UserDTO): Promise<{
        access_token: string;
    }>;
}
