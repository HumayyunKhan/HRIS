import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EMPLOYEESTATUS, ROLE } from '../../../shared';
import { JOB } from '../../../shared';
import { User } from 'src/module/user/entities/user.entity';
import { JobApplications } from './job.applications.entity';
import { Jobs } from './job.entity';
import { Organization } from './organization.entity';
import { EmployeeAssets } from './employee_assets.entity';
// import { UserRoles } from './user.roles.entity';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @ManyToOne(()=>Organization, (org)=>org.employees)
  organization:Organization

  @ManyToOne(() => User, (user) => user.employee) 
  employee: User

  @Column({ type: 'varchar', length: 1000, default: "", nullable: true })
  position: string;

  @Column({ type: "enum", enum:EMPLOYEESTATUS, default:EMPLOYEESTATUS.ONBOARDED, nullable: true })
  status:EMPLOYEESTATUS ;

  @ManyToOne(() => User, (user) => user.jobs) 
  employer: User

  @OneToMany(() => EmployeeAssets, (asset) => asset.employee) 
  assets: EmployeeAssets


}


