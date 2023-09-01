import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core';
import { constructErrorResponse, constructSuccessResponse } from '../../shared';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
@Public()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

}
