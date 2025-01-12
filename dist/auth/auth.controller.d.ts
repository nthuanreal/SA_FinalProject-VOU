import { AuthService } from './auth.service';
import { AuthDTO } from 'src/DTO';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authDTO: AuthDTO): Promise<{
        access_token: string;
    }>;
    login(authDTO: AuthDTO): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<any>;
}
