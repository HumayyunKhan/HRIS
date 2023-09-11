import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class VerifyUserDto {

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  phone: string;
}