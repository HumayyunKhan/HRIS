import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/module/user/entities/user.entity';
import { ORGANIZATIONSTATUS } from 'src/shared';
import { Organization } from '../entities/organization.entity';

// title:"NODEJS DEVELOPER",companyName:"TECHMANIA",employer:{id},position:"Junior Developer",vacancies:1
export class ManagerCreationDto {


  @Expose()
  @IsNotEmpty()
  user: User;

  @Expose()
  @IsNotEmpty()
  organization: Organization;



}

