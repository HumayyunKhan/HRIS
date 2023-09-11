import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
export class EmailDto {
  @IsNotEmpty()
  email: string;
}

export class OtpDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  code: string;
}


