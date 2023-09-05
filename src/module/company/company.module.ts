import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { JobRepository } from './repositories/job.repository';
import { CompanyService,  } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository])],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(CompanyController, { path: '/', method: RequestMethod.ALL });
  }
}
