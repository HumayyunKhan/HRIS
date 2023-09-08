import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ROLE } from '../../../shared';
import { User } from './user.entity';

@Entity({ name: 'user_roles' })
export class UserRoles extends BaseEntity {

  @ManyToOne(() => User, (user) => user.roles,{nullable:true})
  user: User  
 
  @Column({
    type: 'enum',
    enum: ROLE,
  })
  role: string;

}
