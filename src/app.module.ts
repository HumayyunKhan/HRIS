import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule, JwtAuthGuard } from './module/auth';
import { CoreModule, RolesGuard } from './core';

import { SharedModule } from './shared';
import { UserModule } from './module/user';
import { AdminModule } from './module/admin';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
    AdminModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
