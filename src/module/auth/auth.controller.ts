import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../core';
import { ApiResponseDto } from '../../shared';
import { CreateUserDto } from '../user';
import { AuthTokenDto, LoginDto } from './dtos';
import { AuthService } from './auth.service';

@ApiTags('User Auth')
@Public()
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


}
