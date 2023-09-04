import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MapperUtil, ROLE, UnAuthorizedException } from '../../shared';
import { UserDto, CreateUserDto, UserService, VerifyUserDto } from '../user';
import { AuthPayload, AuthTokenDto, JwtPayload, LoginDto } from './dtos';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  async registration(body: any,file:any) {
console.log(body.name,"---------------")
    const data=await this.createUser(body)
return {data:data,message:"User successfully created"}

    
  }

  test(req: any) {
    return {data:"HELLO",message:"WORKING ON AUTH"}
  }
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    // @InjectRepository(User)
    // private readonly userRepository:Repository<User>
  ) {}

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<AuthTokenDto> {
    const user = await this.userService.createAndGetUser(verifyUserDto);
    return this.generateAuthToken(MapperUtil.map(UserDto, user), ROLE.EMPLOYEE, user.phone);
  }

  async createUser(createUserDto: CreateUserDto): Promise<AuthTokenDto> {
    console.log("----------------------inside CRAETE USER FUNCTION -------------------")
    createUserDto.password = await this.hashPassword(createUserDto.password);
    console.log("PASSWORD",createUserDto.password)
    const user = await this.userService.createUser(createUserDto);
    console.log(user,"------------------")
    return this.generateAuthToken(MapperUtil.map(UserDto, user), ROLE.EMPLOYEE, user.phone);
  }

  async authenticateUser(loginDto: LoginDto): Promise<AuthTokenDto> {
    const user = await this.userService.findByEmail(loginDto.email);
    console.log(user)
    await this.validateCredentials(loginDto, user);
    return this.generateAuthToken(MapperUtil.map(UserDto, user), ROLE.EMPLOYEE, user.phone);
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
    console.log(loginDto.password)
    console.log(data.password)

    const match = await this.comparePasswords(loginDto.password, data.password);
    console.log(match,"00000000000000000")
    if (!match) {
      throw new UnAuthorizedException('INVALID_CREDENTIALS PASSWORD');
    }
    return true;
  }

  async hashPassword(password: string): Promise<string> {
    const hash=await bcrypt.hash(password, 10);
    console.log(hash)
    return hash
  }

 async comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return  await bcrypt.compare(password, passwordHash);
  }

  private _getJwtExpiryByRole(role: ROLE) {
    return {
      accessTokenExpiry: this.configService.get('jwt.accessTokenExpiresInSec'),
    };
  }
}
