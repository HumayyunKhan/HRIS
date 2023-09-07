import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ROLE } from '../../../shared';
import { JOB } from '../../../shared';
import { User } from 'src/module/user/entities/user.entity';
import { JobApplications } from './job.applications.entity';
// import { UserRoles } from './user.roles.entity';

@Entity({ name: 'jobs' })
export class Jobs extends BaseEntity {
  @Column({ type: 'varchar', length: 600, default: null, nullable: true })
  title: string;

  @Column({ type: 'varchar',name:"company_name", length: 255, unique: true, nullable: true })
  companyName: string;

  @Column({ type: 'varchar', length: 1000, default: "", nullable: true })
  position: string;

  @Column({ type: 'integer',  default: 1, nullable: true })
  vacancies: number;

  @Column({ type: "enum", enum:JOB, default:JOB.OPEN, nullable: true })
  status:JOB ;

  @ManyToOne(() => User, (user) => user.jobs) 
  employer: User
  @OneToMany(() => JobApplications, (applications) => applications.job) 
  applications: JobApplications

}


