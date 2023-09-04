import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles, RolesGuard } from 'src/core';
import { ROLE, constructErrorResponse, constructSuccessResponse } from '../../shared';
import { AdminService } from './admin.service';
import { UserService } from '../user';
import { rolePayload } from './dtos/role.dto';

@ApiTags('admin')
@Controller('admin')
@Public()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/add-role')
  @Roles(ROLE.ADMIN)

  async roleAssignment(@Req() req:any ,@Body() body: rolePayload) {
    try {
      const {message}= await this.adminService.createUserRole(req.body); 
      // const message = "Role successfully added";
      return constructSuccessResponse(null, message)
    } catch (error) {
      console.log(error)
      return constructErrorResponse(error)
    }
  }


}
