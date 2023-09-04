import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ROLE } from "src/shared";

export class rolePayload {

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    role: ROLE ;
  
  }
  