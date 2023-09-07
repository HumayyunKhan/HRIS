import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule, JwtAuthGuard } from './module/auth';
import { CoreModule, RolesGuard } from './core';

import { SharedModule } from './shared';
import { UserModule } from './module/user';
import { AdminModule } from './module/admin';
import { OrganizationModule } from './module/company';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
    AdminModule,
    OrganizationModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
