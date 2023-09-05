import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/core';
import { constructErrorResponse, constructSuccessResponse, ROLE, SuccessResponseDto } from '../../shared';
import { CreateUserDto, UserDto } from './dtos';
import { CompanyService } from './company.service';

@ApiTags('User')
@Controller('User')
@Public()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('')
  async TESTER(@Req() req: any,) {
    try {
      
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(null)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }


}
