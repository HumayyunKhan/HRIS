import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { ROLE } from 'src/shared';

export class AuthTokenDto {
  accessToken: string;
  authInfo: any;
}

export class JwtPayload {
  @Expose()
  sub: string;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  roles: ROLE[];
}

export class AuthPayload {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  roles: ROLE[];
}
export class EMAIL {
  @Expose()
  @IsEmail()
  email: string;

}
