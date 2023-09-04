import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/core';
import { constructErrorResponse, constructSuccessResponse, ROLE, SuccessResponseDto } from '../../shared';
import { CreateUserDto, UserDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('User')
@Public()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async TESTER(@Req() req: any,) {
    try {
      const {data,message} = await this.userService.test(req);
      // const message = "Stories successfully fetched";
      return constructSuccessResponse(data, message)
    } catch (error) {
      return constructErrorResponse(error)
    }
  }


}
