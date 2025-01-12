import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
export declare class DatabaseService implements OnApplicationBootstrap {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    findByUserID(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    update(id: number, user: Partial<User>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    private checkDatabase;
    seedDatabase(): Promise<void>;
    onApplicationBootstrap(): Promise<void>;
}
