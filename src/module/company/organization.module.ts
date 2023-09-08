import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './organization.controller';
import { JobRepository } from './repositories/job.repository';
import { OrganizationService,  } from './organization.service';
import { ApplicationRepository } from './repositories/job.application.repository';
import { OrgRepository } from './repositories/organization.repository';
import { ManagerRepo } from './repositories/manager.repository';
import { UserRoleRepository } from '../user/repositories/user.role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository,ManagerRepo,UserRoleRepository,ApplicationRepository,OrgRepository])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(OrganizationController, { path: '/', method: RequestMethod.ALL });
  }
}
