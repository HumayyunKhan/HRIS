import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
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
  async JobApplication(@Req() req: any,@UploadedFile() file:any,@Body() Body:any, @Param('id',ParseIntPipe) id:number) {
    try {
      const {data,message} = await this.userService.createApplication(req);
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      console.log(error,"0000000000000000000000000")
      return constructErrorResponse(error)
    }
  }

  @Delete('job/:id/cancel-application')
  @UseInterceptors(FileInterceptor('file'))
  async CancelApplication(@Req() req: any,@UploadedFile() file:any,@Body() Body:any, @Param('id',ParseIntPipe) id:number) {
    try {
      const {data,message} = await this.userService.deleteApplication(req);
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      console.log(error,"0000000000000000000000000")
      return constructErrorResponse(error)
    }
  }

  @Get('profile')
  async PersonalProfile(@Req() req: any, file:any,@Body() Body:any, id:number) {
    try {
      const {data,message} = await this.userService.viewProfile(req.user.id);
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      console.log(error,"0000000000000000000000000")
      return constructErrorResponse(error)
    }
  }

  @Get('profile/:id')
  async ViewProfile(@Req() req: any, file:any,@Body() Body:any, @Param('id',ParseIntPipe) id:number) {
    try {
      console.log(id,"-----------------")
      const {data,message} = await this.userService.viewProfile(id);
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      console.log(error,"0000000000000000000000000")
      return constructErrorResponse(error)
    }
  }
}
