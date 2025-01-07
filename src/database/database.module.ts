import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { DatabaseService } from './database.service';
require('dotenv').config();


@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        database: process.env.DB_NAME || 'user_service', 
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: String(process.env.DB_PASSWORD),
        entities: [User],
        autoLoadEntities: true,
        synchronize: true,
        logging: false, 
    }), TypeOrmModule.forFeature([User])],
    providers: [DatabaseService],
    controllers: [],
    exports: [DatabaseService]
})
export class DatabaseModule {}
