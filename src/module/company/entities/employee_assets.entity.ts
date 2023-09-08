import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EMPLOYEESTATUS, ROLE } from '../../../shared';
import { JOB } from '../../../shared';
import { User } from 'src/module/user/entities/user.entity';
import { JobApplications } from './job.applications.entity';
import { Jobs } from './job.entity';
import { Organization } from './organization.entity';
import { Employee } from './employee.entity';
// import { UserRoles } from './user.roles.entity';

@Entity({ name: 'employee_assets' })
export class EmployeeAssets extends BaseEntity {

  @ManyToOne(() => Employee, (emp) => emp.assets) 
  employee: Employee

  @Column({ type: 'varchar', length: 1000, default: "", nullable: true })
  asset: string;



}


