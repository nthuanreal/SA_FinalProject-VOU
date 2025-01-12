import { DatabaseService } from 'src/database/database.service';
export declare class UserService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<import("typeorm").UpdateResult>;
    editProfile(userId: number, newUsername: string, newEmail: string): Promise<import("typeorm").UpdateResult>;
    getUserProfile(userId: number): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
    }>;
    editUserProfile(userId: number, newUsername: string, newEmail: string, newRole: string, newPartnerid: number, newIsActive: boolean): Promise<import("typeorm").UpdateResult>;
    getUserInfo(userId: number): Promise<{
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
    getAllUser(): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        partner_id: number;
        isActive: boolean;
    }[]>;
}
