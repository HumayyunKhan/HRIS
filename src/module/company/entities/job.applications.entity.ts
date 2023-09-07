import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { JOBSTATUS } from '../../../shared';
import { User } from 'src/module/user/entities/user.entity';
import { Jobs } from './job.entity';
// import { UserRoles } from './user.roles.entity';

@Entity({ name: 'job_applications' })
export class JobApplications extends BaseEntity {
  @ManyToOne(()=>Jobs, (jobs)=>jobs.applications)
  job:Jobs

  @ManyToOne(() => User, (user) => user.applications) 
  applicant: User

  @Column({name:"resume",type:"longtext",nullable:true})
  resume:string

  @Column({name:"status",type:"enum",enum:JOBSTATUS,default:JOBSTATUS.PENDING})
  status:JOBSTATUS

}


