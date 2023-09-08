import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { ROLE } from '../../../shared';
import { UserRoles } from './user.roles.entity';
import { Jobs } from 'src/module/company/entities/job.entity';
import { Organization } from 'src/module/company/entities/organization.entity';
import { JobApplications } from 'src/module/company/entities/job.applications.entity';
import { Employee } from 'src/module/company/entities/employee.entity';
import { Sessions } from 'src/module/auth/entities/user.session.entity';

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

  @Column({ type: 'varchar', length: 255, default: '',name:"image_url", nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, default: '',name:"shirt_size", nullable: true })
  shirtSize: string;

  @Column({ type: 'varchar', length: 255, default: '',name:"shipping_address", nullable: true })
  shippingAddress: string;

  @Column({ type: 'date',name:"start_date", nullable: true })
  startDate: Date;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true })
  status: string;
  
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

  @OneToOne(()=>Sessions,(session)=>session.user)
  session:Sessions
 
 
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email ? this.email.toLowerCase() : this.email;
  }
}
