import { Expose } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @Expose()
  @UpdateDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
