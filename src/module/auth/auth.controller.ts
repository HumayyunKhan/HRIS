import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../core';
import { ApiResponseDto, constructErrorResponse, constructSuccessResponse } from '../../shared';
import { CreateUserDto } from '../user';
import { AuthTokenDto, LoginDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';

@ApiTags('User Auth')
@Public()
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get('/')
  async gameSchedule(@Req() req: any,) {
    try {
      const data = await this.authService.test(req); 
      const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }
  @Post('/signup')
  @UseInterceptors(FileInterceptor('file'))
  async registeration(@UploadedFile() file: any,@Req() req: any) {
    try {
      const data = await this.authService.registration(req.body,file); 
      const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      console.log(error)
      return constructErrorResponse(error)
    }
  }
  @Post('/signin')
  async login(@Req() req: any,) {
    try {
      const data = await this.authService.authenticateUser(req.body); 
      const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }

}
