import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column({ unique: true, nullable: true  })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string; // 'user', 'partner', 'admin'

  @Column({default: 0})
  partner_id: number; 

  @Column({ default: true })
  isActive: boolean;
}