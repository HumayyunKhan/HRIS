import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { Jobs } from '../entities/job.entity';
import { User } from 'src/module/user/entities/user.entity';

export class applicationDto {

  @Expose()
  @IsNotEmpty()
  job: Jobs;

  @Expose()
  @IsNotEmpty()
  applicant: User;

  @Expose()
  @IsOptional()
  resume: string;



}

