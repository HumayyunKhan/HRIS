import { Body, Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/core';
import { constructErrorResponse, constructSuccessResponse, ROLE, SuccessResponseDto } from '../../shared';
import * as DTO from './dtos';
import { OrganizationService } from './organization.service';

@ApiTags('Jobs')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly companyService: OrganizationService) {}

  @Get('')
  @Public()
  async TESTER(@Req() req: any,) {
    try {
      
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(null)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }

  @Get('jobs')
  @Public()
  async FetchJobs(@Req() req: any,) {
    try {
      
      const {data,message}=await this.companyService.FetchJobs()
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data,message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }

  @Post('create-job')
  @Roles(ROLE.MANAGER)
  async CreateJobs(@Req() req: any,@Body() createJobDto:DTO.CreateJobDto) {
    try {
      const {data,message}=await this.companyService.CreateJob(req.user.id,createJobDto)
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data,message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }
  
  @Delete('close-job')
  @Roles(ROLE.MANAGER)
  async CloseJobs(@Req() req: any,@Body() createJobDto:DTO.CreateJobDto) {
    try {
      const {data,message}=await this.companyService.CloseJob(req.user.id)
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data,message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }


}
