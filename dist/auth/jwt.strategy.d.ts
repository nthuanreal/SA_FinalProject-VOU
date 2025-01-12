import { UserDTO } from 'src/DTO';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserDTO): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
    }>;
}
export {};
