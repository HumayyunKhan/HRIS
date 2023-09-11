import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MapperUtil, ROLE, UnAuthorizedException } from '../../shared';
import { UserDto, CreateUserDto, UserService, VerifyUserDto, UserRepository } from '../user';
import { AuthPayload, AuthTokenDto, JwtPayload, LoginDto,OtpDto } from './dtos';
import {issue, verify} from "./guards/jwt/index"
import { SendEmail } from 'src/core/services/sendgrid.service';
import { uploadFile } from 'src/shared/utils/s3Bucket';
import { UserVerificationRepository } from '../user/repositories/user.verification.repository';
import { UserSessionsRepository } from '../user/repositories/user.sessions.repository';

@Injectable()
export class AuthService {
  async registration(body: any,file:any) {
console.log(body.name,"---------------",file)
if(file){
  const fileUrl=await uploadFile(file.buffer,file.originalname)
  console.log(fileUrl,"FILE URL----------------")
  body.imageUrl=fileUrl
}

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
    private readonly userRepo: UserRepository,
    private readonly verificationRepo: UserVerificationRepository,
    private readonly sessionRepo: UserSessionsRepository,
    
  ) {}

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<AuthTokenDto> {
    const user = await this.userService.createAndGetUser(verifyUserDto);
    return await this.generateAuthToken(MapperUtil.map(UserDto, user), [ROLE.USER], user.phone);
  }

  async createUser(createUserDto: CreateUserDto) {
    console.log("----------------------inside CRAETE USER FUNCTION -------------------")
    createUserDto.password = await this.hashPassword(createUserDto.password);
    console.log("PASSWORD",createUserDto.password)
    const user = await this.userService.createUser(createUserDto);
    console.log(user,"------------------")
    return user
    // return await this.generateAuthToken(MapperUtil.map(UserDto, user), [ROLE.USER], user.phone);
  }

  async authenticateUser(loginDto: LoginDto): Promise<AuthTokenDto> {
    let user:any = await this.userService.findByEmail(loginDto.email);
    user.roles=user.roles.map((u:any)=>u.role)
    console.log(user)
    await this.validateCredentials(loginDto, user);
    return await this.generateAuthToken(MapperUtil.map(UserDto, user), user.roles, user.phone);
  }

  async getAuthToken(data: any, authPayload: AuthPayload): Promise<AuthTokenDto> {
    const subject = { sub: authPayload.id };
    const payload: JwtPayload = MapperUtil.map(JwtPayload, authPayload);
    payload.sub = authPayload.id;

    const tokenExpiry = this._getJwtExpiryByRole(authPayload.roles[0]);
   const accessToken= this.jwtService.sign({ ...payload, ...subject }, { expiresIn: tokenExpiry.accessTokenExpiry })

    const sessionExist=await this.sessionRepo.findOne({where:{user:{id:parseInt(authPayload.id)}}})
    if(sessionExist)await this.sessionRepo.delete(sessionExist.id)
    const newSession = this.sessionRepo.create({token:accessToken,user:{id:parseInt(payload.sub)}})
  await this.sessionRepo.save(newSession)

    const authToken: AuthTokenDto = {
      accessToken: accessToken,
      authInfo: data,
    };
    return authToken;
  }

 async generateAuthToken(data: any, role: any, username: string): Promise<AuthTokenDto> {
    const authPayload = MapperUtil.map(AuthPayload, data);
    authPayload.roles = role;
    authPayload.username = username;
    return await this.getAuthToken(data, authPayload);
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
  async validateCode(data: any) {
    console.log(data.code)
    console.log(data.email)

    const verification = await this.verificationRepo.findOne({where:{ user:{id:data.userId}, code: data.code }})
    console.log(verification,"------------------------")
    const currentTime = new Date();
    if (!verification) {
      throw new UnAuthorizedException('OTP INVALID');
    }

      if (verification.expiresAt <= currentTime) throw new UnauthorizedException("Otp expired")
      if (verification.verified == true) throw new BadRequestException("Already verified")
    console.log(verification,"00000000000000000")

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
 
  async forgotPassword(body: any) {
    const { email } = body
    const user = await this.userService.findByEmail(email);
    if (!user) throw new BadRequestException("user not found")

    const token = issue({ id: user.id }, '24hr');
    const resetEmail = ` <h1>Hello ${user.name}</h1>, 

        <p>please click on the link to reset your password: <a target="_blank" href=${process.env.RESET_URL}?token=${token}> reset password </a></p>
        <p>please copy paste following url in browser if link doesnt work</p>

      <em>${process.env.RESET_URL}?token=${token}</em>
      <hr />
       <p>Link is valid for 1 hour only.</p>
        <p>if you didn't initiate password reset please ignore this email.</p>
      `;
    const message = {
      to: user.email,
      from: process.env.SENDGRID_SENDER, // Change to your verified sender
      subject: 'OTP - HRIS',
      html: resetEmail,
    };
    await SendEmail(message);
    return {data:{},message:"'Email with Password reset instructions has been sent to your registered email address.'"}
    // return constructSuccessResponse({}, )

  }

  async passwordReset(body: any, query: any) {
    const { password } = body;
    const { token } = query;
    const isValid: any = verify(token);
    if (!isValid) throw new UnauthorizedException("Invalid token")
    const user = await this.userService.findById(isValid.id);
    if (!user) throw new UnauthorizedException("user not found")
    const isPasswordReused = await bcrypt.compare(password, user.password);
    if (isPasswordReused) throw new BadRequestException("Cannot use old password")
    const passwordHash = await bcrypt.hash(password, process.env.SALT_ROUNDS);
    await this.userRepo.update(
      { id: isValid.id },
      { password: passwordHash },
    );

    return {}
  }
  async optAuthenticate(data: OtpDto) {
    let user:any= await this.userService.findByEmail(data.email);
    if(!user)throw new UnAuthorizedException("USER NOT FOUND")
    console.log(user)
    user.roles=user.roles.map((u:any)=>u.role)
    
    console.log(user)
    await this.validateCode({userId:user.id,code:data.code,email:data.email});
    return await this.generateAuthToken(MapperUtil.map(UserDto, user), user.roles, user.phone);
 
  }


}
