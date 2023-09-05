import { Injectable } from '@nestjs/common';
import { NotFoundException, ROLE } from '../../shared';
import { CreateUserDto, UserDto, VerifyUserDto } from './dtos';
import { User } from './entities/job.entity';
import { JobRepository } from './repositories/job.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  test(req: any) {
    return {data:"HELLO WORLD",message:"ITS WORKS FOR THIS ROUTE"}
    // throw new Error('Method not implemented.'); 
  }
  constructor(private readonly jobRepository: JobRepository) {}

  
}
