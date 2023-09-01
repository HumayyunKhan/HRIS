import { Injectable } from '@nestjs/common';
import { NotFoundException, ROLE } from '../../../src/shared';
import { CreateUserDto, UserDto, VerifyUserDto } from './dtos';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
