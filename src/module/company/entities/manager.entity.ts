import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EMPLOYEESTATUS, ROLE } from '../../../shared';
import { JOB } from '../../../shared';
import { User } from 'src/module/user/entities/user.entity';
import { JobApplications } from './job.applications.entity';
import { Jobs } from './job.entity';
import { Organization } from './organization.entity';
// import { UserRoles } from './user.roles.entity';

@Entity({ name: 'employees' })
export class Manager extends BaseEntity {
  @ManyToOne(()=>Organization, (org)=>org.employees)
  organization:Organization

  @ManyToOne(() => Manager, (manager) => manager.manager) 
  manager: Manager

  @Column({ type: "enum", enum:EMPLOYEESTATUS, default:EMPLOYEESTATUS.ONBOARDED, nullable: true })
  status:EMPLOYEESTATUS ;


}


