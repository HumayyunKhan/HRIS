import { Injectable } from '@nestjs/common';
import { NotFoundException, ROLE } from '../../../src/shared';
import { CreateUserDto, UserDto, VerifyUserDto } from './dtos';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  test(req: any) {
    return {data:"HELLO WORLD",message:"ITS WORKS FOR THIS ROUTE"}
    // throw new Error('Method not implemented.');
  }
  constructor(private readonly userRepository: UserRepository) {}

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

    const userIdExist = await this.userRepository.findOne({ userId: createUserDto.userId });

    if (userIdExist) {
      throw { message: `User Already exists with same userId!`, status: 400 };
    }
    console.log("CLOSE TO  USER CRAETION")
    createUserDto.role = ROLE[createUserDto.role];
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user=this.userRepository.create(createUserDto)
     await this.userRepository.save(user);
    
    delete user.password;
    return user;
  }
  async updateUser(data: any, userId: any): Promise<any> {
    const userExist = await this.userRepository.findOne({ email: data.email });

    if (userExist) {
      throw { message: `User Already exists with same email!`, status: 400 };
    }

    const userIdExist = await this.userRepository.findOne({ userId: data.userId });

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
  async getUserByOrgId(organizationId: string): Promise<any> {
    return await this.userRepository.find({where: { organizationId }});
  }
  async getAllPhysician(): Promise<any> {
    return await this.userRepository.find({ role: 'DOCTOR' });
  }

  async findByPhoneNumber(phone: string): Promise<User> {
    return await this.userRepository.findOne({ phone });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where:{email} });
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
}
