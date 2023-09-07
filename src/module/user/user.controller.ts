import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/core';
import { constructErrorResponse, constructSuccessResponse, ROLE, SuccessResponseDto } from '../../shared';
// import * as DTO from './dtos';
import { applicationDto } from '../company';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrganizationService } from '../company';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly organizationService: OrganizationService) {}

  @Post('job/:id/apply')
  @UseInterceptors(FileInterceptor('file'))
  async TESTER(@Req() req: any,@UploadedFile() file:any,@Body() Body:any) {
    try {
      const {data,message} = await this.userService.createApplication(req);
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }


}
