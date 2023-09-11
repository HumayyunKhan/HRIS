import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { NotFoundException, ROLE } from '../../../src/shared';
import { CreateUserDto, UserDto, VerifyUserDto } from './dtos';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserRoleRepository } from './repositories/user.role.repository';
import { OrganizationService, applicationDto } from '../organization';
import { ApplicationRepository } from '../organization/repositories/job.application.repository';
import { uploadFile } from 'src/shared/utils/s3Bucket';
import { SendEmail } from 'src/core/services/sendgrid.service';
import { UserSessionsRepository } from './repositories/user.sessions.repository';
import { UserVerificationRepository } from './repositories/user.verification.repository';
import { getRandomPort } from 'src/shared/helpers/auth';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly organizationService:OrganizationService,
    private readonly applicationRepo:ApplicationRepository,
    private readonly sessionRepo:UserSessionsRepository,
    private readonly verificationRepo:UserVerificationRepository
  
    
    ) {}

  test(req: any) {
    return {data:"HELLO WORLD",message:"ITS WORKS FOR THIS ROUTE"}
    // throw new Error('Method not implemented.'); 
  }


 async  viewProfile(id:number) {
    const user = await this.userRepository.findOne()
    delete user.applications
    // const user = await this.userRepository.findOne({where:{id:id}})
    if(!user)throw new BadRequestException("User not found")
    console.log(user)
    return {data:user,message:"Profile data successfully fetched"}
    // throw new Error('Method not implemented.'); 
  }
 async  createApplication(req:any,file:any){
    const {id}=req.params;
    const application=req.body
    if(file){
      application["job"]=await uploadFile(file.buffer,file.originalname)
    }
    application["applicant"]={id:req.user.id};
    application["job"]={id:id};
    const jobExist=await this.organizationService.findJob({where:{id}})
   const submission=await this.organizationService.JobApplication(application)

   return {data:submission,message:"Successfully applied for the job"}



  }
 async  deleteApplication(req:any){
    const {id}=req.params;
    const jobExist=await this.organizationService.findJobApplication({where:{id,applicant:{id:req.user.id}}})
    await this.applicationRepo.softDelete(id)
  //  const submission=await this.organizationService.JobApplication(application)

   return {data:{},message:"Application successfully cancelled"}



  }

  async createAndGetUser(verifyUserDto: VerifyUserDto): Promise<User> {
    let user = await this.findByPhoneNumber(verifyUserDto.phone);

    if (!user) {
      user = new User();
      user.name = verifyUserDto.name;
      user.phone = verifyUserDto.phone;
      return await this.userRepository.save(user);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const userExist = await this.userRepository.findOne({ email: createUserDto.email });
    if (userExist) {
      throw { message: `User Already exists with same email!`, status: 400 };
    }
    createUserDto.role = ROLE[createUserDto.role];
    // createUserDto.password = await this.hashPassword(createUserDto.password);
    const user=this.userRepository.create(createUserDto)
     await this.userRepository.save(user);
     await this.userRoleRepository.save({user:{id:user.id},role:ROLE[createUserDto.role]})
     const otp=await this.sendEmail(user.name,user.email)
     const verification=await this.createNewVerification({userId:user.id,otp:otp})
    
    delete user.password;
    return user; 
  }
  async updateUser(data: any, userId: any): Promise<any> {
    const userExist = await this.userRepository.findOne({ email: data.email });

    if (userExist) {
      throw { message: `User Already exists with same email!`, status: 400 };
    }

    const userIdExist = await this.userRepository.findOne({ id: data.userId });

    if (userIdExist) {
      throw { message: `User Already exists with same userId!`, status: 400 };
    }
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }
    const user = await this.userRepository.update({ id: userId }, data);
    if (user && user.affected > 0) {
      return { message: 'Updated User successfully!', status: 200 };
    } else {
      throw { message: `User Not Updated Successfully!`, status: 400 };
    }
  }
  async createUserRole(userId: number, role: string): Promise<any> {
    const roleExist = await this.userRoleRepository.findOne({ where:{user:{id:userId},role:role} });

    if (roleExist) {
      throw { message: `User Already exists with same role!`, status: 400 };
    }

    const user_role = await this.userRoleRepository.create({user:{id:userId},role:role});
    await this.userRoleRepository.save(user_role)
    if (user_role) {
      return { message: 'Role successfully assigned to user', status: 200, data:null};
    } else {
      throw { message: `User Not Updated Successfully!`, status: 400 };
    }
  }
  async getUserByOrgId(organizationId: string): Promise<any> {
    return await this.userRepository.find({where: { organizationId }});
  }


  async findByPhoneNumber(phone: string): Promise<User> {
    return await this.userRepository.findOne({ phone });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where:{email:email} ,relations:['roles']});
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('ENTITY_NOT_FOUND', { field: User.name, id: id });
    }
    return user;
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createNewVerification(data: any) {
    const currentTime = new Date().getTime()
    const expireTime = new Date(currentTime + parseInt(process.env.OTP_EXPIRE_TIME))
    console.log("expireTime", expireTime)
    const verification =  this.verificationRepo.create({
      code: data.otp,
      user: {id:data.userId},
      verified: false,
      expiresAt: expireTime,
    })
    await this.verificationRepo.save(verification)
    return verification
  }
  async updateVerification(data: any) {
    const currentTime = new Date().getTime()
    const expireTime = new Date(currentTime + parseInt(process.env.OTP_EXPIRE_TIME))
    console.log("expireTime", expireTime)
    const verification = await this.verificationRepo.update({user:{id:data.userId}},{
      code: data.otp,
      expiresAt: expireTime,
    })
    return verification
  }
  
  async sendEmail(username: String, email: string) {
    let otp = await getRandomPort();
    console.log(otp, "otp here")
    const resetEmail = ` <h1>Hello ${username}</h1>, 
        
        <p>please use this otp: ${otp}</p>
          <p>this otp is only valid for 1 hr</p>
          
          <hr />
          <p>Otp is valid for 1 hour only.</p>
          <p>if you didn't initiate otp verificaation please ignore this email.</p>
          `;
    const message = {
      to: email,
      from: process.env.SENDGRID_SENDER, // Change to your verified sender
      subject: 'Verification - writeout',
      html: resetEmail,
    };
    console.log(message)
    const otpSent = await SendEmail(message);
    if (!otpSent) throw new InternalServerErrorException()
    return otp
  }

  async fetchOtp(body: any) {
    const { email } = body
    const user = await this.userRepository.findOne({where:{ email: email }})
    if (!user) throw new BadRequestException("User not found")

    const alreadyVerified = await this.verificationRepo.findOne({where:{ verified: true, user:{id: user.id} }})

    if (alreadyVerified)
      throw new UnauthorizedException("Email already verified")

    let otp = await this.sendEmail(user.name, user.email)

    const registered = await this.verificationRepo.findOne({ user:{id: user.id }})
    if (!registered) {
       const verification = this.createNewVerification({ otp, id: user.id }) 
      }
      this.updateVerification({userId:user.id,code:otp})

    const currentTime = new Date().getTime()
    const otpUpdate = await this.verificationRepo.update({ user:{id:user.id} }, { code: otp, expiresAt: new Date(currentTime + parseInt(process.env.OTP_EXPIRE_TIME)||10000) })

    return {}


  }

  // async optAuthenticate(req: any) {
  //   const { otp, email } = req.body
  //   const user = await this.userRepository.findOne({where:{email}})

  //   if (!user) throw new BadRequestException("User not found")

  //   let roles = await this.userRoleRepository.find({where:{user:{id:user.id}}})
  //   roles.map((role)=>role.role)

  //   user["roles"] = roles;

  //   const verification = await this.verificationRepo.findOne({where:{ userId: user.id, code: otp }})
  //   const currentTime = new Date();
  //   // const verification:any={};
  //   if (user && verification) {
  //     if (verification.expiresAt <= currentTime) throw new UnauthorizedException("Otp expired")
  //     if (verification.verified == true) throw new BadRequestException("Already verified")

  //     const timeTaken = currentTime.getTime() - new Date(verification.updatedAt).getTime()

  //     const data = await this.issueJwtToken(user);
  //     return data


  //   } else {
  //     throw new BadRequestException("An error occured while authenticating")
  //   }
  // }

}
