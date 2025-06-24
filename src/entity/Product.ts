import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Category } from './Category';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 100 })
  name: string;

  @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'nvarchar', length: 50, unique: true })
  sku: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  image?: string;

  @Column({ nullable: true })
  categoryId?: number;

  @ManyToOne(() => Category, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
