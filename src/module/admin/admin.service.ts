import { Injectable } from '@nestjs/common';
import { updateDb } from 'src/core/config/mysqlImporter';
import { getManager } from 'typeorm';
import { ROLE } from '../../shared';
import { AuthService } from '../auth';

// import { OrganizationRepository, AdminRepository } from './repositories';

@Injectable()
export class AdminService {
  constructor(
    private readonly authService: AuthService,

  ) {}

}
