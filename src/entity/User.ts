import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 100 })
  names: string;

  @Column({ type: 'nvarchar', length: 100 })
  lastNames: string;

  @Column({ type: 'nvarchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'nvarchar', length: 255 })
  password?: string;

  @Column({ type: 'nvarchar', length: 50, default: 'ADMIN' })
  rol: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
