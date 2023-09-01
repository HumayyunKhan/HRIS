import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsOptional()
  phone: string;

  @Expose()
  @IsNotEmpty()
  userId: string;
}
