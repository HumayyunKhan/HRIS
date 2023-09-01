import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ROLE } from '../../../shared';

@Entity({name:"admin"})
export class Admin extends BaseEntity {
  @Column({ type: 'varchar', length: 255, default: null, nullable: true,name:"user_name" })
  userName: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true , name:"email"})
  email: string;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true, name:"password" })
  password: string;

  @Column({
    type: 'enum',
    enum: [ROLE.ADMIN],
  })
  role: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email ? this.email.toLowerCase() : this.email;
  }
}
