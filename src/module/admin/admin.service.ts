import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth';
import { UserService } from '../user';
import { rolePayload } from './dtos/role.dto';

@Injectable()
export class AdminService {
  async createUserRole(body:rolePayload) {
    const {userId,role}=body
    console.log(userId,role)
return await this.userService.createUserRole(userId,role)
    
  }
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService

  ) {}



}
