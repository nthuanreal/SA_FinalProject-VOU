import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getList(): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        partner_id: number;
        isActive: boolean;
    }[]>;
    editUser(id: number, newUsername: string, newEmail: string, newRole: string, newPartnerid: any, newIsActive: boolean): Promise<import("typeorm").UpdateResult>;
    changePassword(password: string, newPassword: string, req: any): Promise<import("typeorm").UpdateResult>;
    editProfile(newUsername: string, newEmail: string, req: any): Promise<import("typeorm").UpdateResult>;
    getProfile(req: any): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
    }>;
    getAll(): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        partner_id: number;
        isActive: boolean;
    }[]>;
    getUser(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        partner_id: number;
        isActive: boolean;
    }>;
    getUserPartnerID(id: number): Promise<{
        partner_id: number;
    }>;
}
