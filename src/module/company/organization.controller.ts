import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/core';
import { constructErrorResponse, constructSuccessResponse, ROLE, SuccessResponseDto } from '../../shared';
import * as DTO from './dtos';
import { OrganizationService } from './organization.service';

@ApiTags('Jobs')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

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
      
      const {data,message}=await this.organizationService.FetchJobs()
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
      const {data,message}=await this.organizationService.CreateJob(req.user.id,createJobDto)
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data,message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }
  
  @Delete('close-job/:id')
  @Roles(ROLE.MANAGER)
  async CloseJobs(@Req() req: any,@Body() createJobDto:DTO.CreateJobDto,@Param('id') id:number) {
    try {
      const {data,message}=await this.organizationService.CloseJob(id,req.user.id)
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data,message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }

  @Get('job/applications')
  @Roles(ROLE.MANAGER)
  async Applications(@Req() req: any) {
    try {
      const {data,message}=await this.organizationService.FetchApplications(req)
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data,message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }


}
