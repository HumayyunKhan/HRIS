import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/module/user/entities/user.entity';
import { ORGANIZATIONSTATUS } from 'src/shared';

// title:"NODEJS DEVELOPER",companyName:"TECHMANIA",employer:{id},position:"Junior Developer",vacancies:1
export class CreateJobDto {
  @Expose()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  position: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  vacancies: number;


}
export class CreateOrgDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  status: ORGANIZATIONSTATUS;

  @Expose()
  @IsNotEmpty()
  @IsString()
  country: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Expose()
  @IsNotEmpty()
  manager: User;




}
export class UpdateOrgDto {
  @Expose()
  // @IsNotEmpty()
  @IsOptional()
  name: string;

  @Expose()
  // @IsNotEmpty()
  @IsString()
  status: ORGANIZATIONSTATUS;

  @Expose()
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  country: string;

  @Expose()
  @IsOptional()
  @IsString()
  address: string;

  @Expose()
  @IsOptional()
  manager: User;




}
