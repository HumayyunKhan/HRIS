import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { USER } from '../../../shared';
import { UserRoles } from './user.roles.entity';
import { Jobs } from 'src/module/organization/entities/job.entity';
import { Organization } from 'src/module/organization/entities/organization.entity';
import { JobApplications } from 'src/module/organization/entities/job.applications.entity';
import { Employee } from 'src/module/organization/entities/employee.entity';
import { Sessions } from 'src/module/auth/entities/user.session.entity';
import { Manager } from 'src/module/organization/entities/manager.entity';
import { Verifications } from 'src/module/auth/entities/user.verification.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, default: null, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 1000, default: '', nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true })
  phone: string;

  @Column({ type: 'longtext', default: null, name: "image_url", nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, default: '', name: "shirt_size", nullable: true })
  shirtSize: string;

  @Column({ type: 'varchar', length: 255, default: '', name: "shipping_address", nullable: true })
  shippingAddress: string;

  @Column({ type: 'date', name: "start_date", nullable: true })
  startDate: Date;

  @Column({ type: 'enum', enum: USER, default: USER.ACTIVE, nullable: true })
  status: USER;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true })
  country: string;


  @OneToMany(() => UserRoles, (role) => role.user)
  roles: UserRoles[]

  @OneToMany(() => Jobs, (job) => job.employer)
  jobs: Jobs[]

  @OneToMany(() => JobApplications, (application) => application.applicant)
  applications: JobApplications;

  @OneToMany(() => Organization, (org) => org.ceo)
  organizations: Organization;

  @OneToMany(() => Employee, (emp) => emp.employee)
  employee: Employee;
  @OneToMany(() => Manager, (man) => man.user)
  managing: Manager;


  @OneToOne(() => Sessions, (session) => session.user)
  // @JoinColumn()
  session: Sessions

  @OneToOne(() => Verifications, (verf) => verf.user)
  // @JoinColumn()
  verification: Verifications;

  // @OneToOne(() => Verifications, (ver) => ver.user)
  // verification: Verifications 


  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email ? this.email.toLowerCase() : this.email;
  }
}
