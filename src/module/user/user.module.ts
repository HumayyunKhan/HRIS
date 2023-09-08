import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { UserRoleRepository } from './repositories/user.role.repository';
import { OrganizationModule } from '../company';
import { ApplicationRepository } from '../company/repositories/job.application.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserRoleRepository, ApplicationRepository]), OrganizationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(UserController, { path: '/', method: RequestMethod.ALL });
  }
}
