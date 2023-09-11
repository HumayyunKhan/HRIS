
import { User } from 'src/module/user/entities/user.entity';
import {BaseEntity}  from '../../../core/entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

@Entity()
export class Verifications {
  @PrimaryGeneratedColumn()
  verificationId: number;

  @Column({ type: 'date', nullable: true })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'date', nullable: true })
  verifiedAt: Date;

  @OneToOne(()=>User ,(user)=>user.verification,{cascade:true,nullable:true})
  @JoinColumn()
  user:User

  @Column({ type: 'integer', nullable: true })
  code: number;

  @Column({ type: 'integer', nullable: true })
  timeToVerify: number;

  // @Column({ type: 'varchar', nullable: true })
  // remoteAddress: string;

  // @Column({ type: 'varchar', nullable: true })
  // network: string;
  @CreateDateColumn({ name: 'created' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted' })
  deletedAt: Date;
}

