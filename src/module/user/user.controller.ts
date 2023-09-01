import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/core';
import { constructErrorResponse, constructSuccessResponse, ROLE, SuccessResponseDto } from '../../shared';
import { CreateUserDto, UserDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('')
@Public()
export class UserController {
  constructor(private readonly userService: UserService) {}


}
