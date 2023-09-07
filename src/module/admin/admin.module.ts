import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';

import { AdminService } from './admin.service';
import { AuthModule } from '../auth';
import { UserModule, UserService } from '../user';
import { OrganizationModule } from '../company';

@Module({
  imports: [AuthModule,UserModule, TypeOrmModule.forFeature([]),OrganizationModule],
  controllers: [AdminController],
  providers: [AdminService,],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(AdminController, { path: '/', method: RequestMethod.ALL });
  }
}
