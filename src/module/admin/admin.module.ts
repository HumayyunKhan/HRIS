import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';

import { AdminService } from './admin.service';
import { AuthModule } from '../auth';
import { UserModule, UserService } from '../user';

@Module({
  imports: [AuthModule,UserModule, TypeOrmModule.forFeature([])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(AdminController, { path: '/', method: RequestMethod.ALL });
  }
}
