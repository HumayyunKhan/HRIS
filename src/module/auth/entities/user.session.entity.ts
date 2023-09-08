
import { User } from 'src/module/user/entities/user.entity';
import {BaseEntity}  from '../../../core/entity/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
@Entity()
export class  Sessions extends BaseEntity {

  @Column({ name: 'token' ,nullable:true}) 
  token: string;

  @OneToOne(() => User, user => user.session, { cascade: true })
  user: User;
}
  
