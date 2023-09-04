import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { ROLE } from '../../../shared';
import { User } from './user.entity';

@Entity({ name: 'user_roles' })
export class UserRoles extends BaseEntity {

  @ManyToOne(() => User, (user) => user.roles)
  user: User

  @Column({
    type: 'enum',
    enum: [ROLE.CONTRACTOR, ROLE.MANAGER,ROLE.ADMIN,ROLE.EMPLOYEE],
  })
  role: string;

}
