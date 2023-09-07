import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  phone: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  password: string;

  @Expose()
  @IsNotEmpty()
  role: string;
}
