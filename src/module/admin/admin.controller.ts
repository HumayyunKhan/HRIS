import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles, RolesGuard } from 'src/core';
import { ROLE, constructErrorResponse, constructSuccessResponse } from '../../shared';
import { AdminService } from './admin.service';
import { UserService } from '../user';

import { rolePayload } from './dtos/role.dto';
import { CreateOrgDto, OrganizationService, UpdateOrgDto } from '../company';

@ApiTags('admin')
@Controller('admin')
@Roles(ROLE.ADMIN)
// @Public()  // to define a controller as public
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly orgService: OrganizationService
    ) {}

  @Post('/add-role')
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

  @Post('/create-organization')
  async CreateOrganization(@Req() req:any ,@Body() body: CreateOrgDto) {
    try {
      const data= await this.orgService.createOrganization(body); 
      const message = "Organization successfully added";
      return constructSuccessResponse(data, message)
    } catch (error) {
      console.log(error)
      return constructErrorResponse(error)
    }
  }
  @Post('/update-organization/:id')
  async UpdateOrganization(@Req() req:any ,@Param('id',ParseIntPipe) id:number ,@Body() body: UpdateOrgDto) {
    try {
      const data= await this.orgService.updateOrganization(body,id); 
      const message = "Organization successfully added";
      return constructSuccessResponse(data, message)
    } catch (error) {
      console.log(error)
      return constructErrorResponse(error)
    }
  }


}
