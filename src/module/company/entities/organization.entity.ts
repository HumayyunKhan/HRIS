import { BaseEntity } from '../../../core/entity/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { JOB ,ORGANIZATIONSTATUS} from '../../../shared';
import { User } from 'src/module/user/entities/user.entity';
import { JobApplications } from './job.applications.entity';
import { UUIDVersion } from 'class-validator';
import { Employee } from './employee.entity';
// import { UserRoles } from './user.roles.entity';

@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {
  @Column({ type: 'varchar', length: 600, default: null, nullable: true })
  name: string;

  @Column({ type: 'uuid',name:"registration_id", unique: true, nullable: false })
  registrationId: any;

  @ManyToOne(()=>User,(user)=>user.organizations,{nullable:true})
  ceo: User;

  @Column({ type: 'varchar',length:500,  default: "", nullable: true })
  address: string; 

  @Column({ type: 'varchar',length:255,  default: "", nullable: true })
  country: string;

  @Column({ type: "enum", enum:ORGANIZATIONSTATUS, default:ORGANIZATIONSTATUS.ACTIVE, nullable: false })
  status:ORGANIZATIONSTATUS ;

  @OneToMany(()=>Employee,(employee)=>employee.organization,{nullable:true})
  employees: Employee;

}


