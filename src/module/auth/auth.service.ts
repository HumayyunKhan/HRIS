import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MapperUtil, ROLE, UnAuthorizedException } from '../../shared';
import { UserDto, CreateUserDto, UserService, VerifyUserDto } from '../user';
import { AuthPayload, AuthTokenDto, JwtPayload, LoginDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<AuthTokenDto> {
    const user = await this.userService.createAndGetUser(verifyUserDto);
    return this.generateAuthToken(MapperUtil.map(UserDto, user), ROLE.DOCTOR, user.phone);
  }

  async createUser(createUserDto: CreateUserDto): Promise<AuthTokenDto> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.userService.createUser(createUserDto);
    return this.generateAuthToken(MapperUtil.map(UserDto, user), ROLE.DOCTOR, user.phone);
  }

  async authenticateUser(loginDto: LoginDto): Promise<AuthTokenDto> {
    const user = await this.userService.findByEmail(loginDto.userId);
    await this.validateCredentials(loginDto, user);
    return this.generateAuthToken(MapperUtil.map(UserDto, user), ROLE.DOCTOR, user.phone);
  }

  getAuthToken(data: any, authPayload: AuthPayload): AuthTokenDto {
    const subject = { sub: authPayload.id };
    const payload: JwtPayload = MapperUtil.map(JwtPayload, authPayload);
    payload.sub = authPayload.id;

    const tokenExpiry = this._getJwtExpiryByRole(authPayload.roles[0]);

    const authToken: AuthTokenDto = {
      accessToken: this.jwtService.sign({ ...payload, ...subject }, { expiresIn: tokenExpiry.accessTokenExpiry }),
      authInfo: data,
    };
    return authToken;
  }

  generateAuthToken(data: any, role: ROLE, username: string): AuthTokenDto {
    const authPayload = MapperUtil.map(AuthPayload, data);
    authPayload.roles = [role];
    authPayload.username = username;
    return this.getAuthToken(data, authPayload);
  }

  async validateCredentials(loginDto: LoginDto, data: any): Promise<boolean> {

    if (!data) {
      throw new UnAuthorizedException('INVALID_CREDENTIALS');
    }

    const match = await this.comparePasswords(loginDto.password, data.password);
    if (!match) {
      throw new UnAuthorizedException('INVALID_CREDENTIALS');
    }
    return true;
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  private _getJwtExpiryByRole(role: ROLE) {
    return {
      accessTokenExpiry: this.configService.get('jwt.accessTokenExpiresInSec'),
    };
  }
}
