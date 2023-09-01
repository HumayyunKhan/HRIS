import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from '../../../shared';

@Entity({name:"organization"})
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: null, nullable: true, name:"name" })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true , name:"email"})
  email: string;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true,name:"password" })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true , name:"organization_id"})
  organizationId: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true , name:"organization_db"})
  organizationDb: string;

  @Column({ type: 'integer', nullable: true , name:"status"})
  status: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true , name:"valid_till"})
  validTill: string;

  @Column({
    type: 'enum',
    enum: [ROLE.ORGANIZATION],
    default: ROLE.ORGANIZATION,
  })
  role: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email ? this.email.toLowerCase() : this.email;
  }
}
