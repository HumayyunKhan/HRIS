import { Routes } from '@nestjs/core';
import { UserModule } from './module/user';
import { AuthModule } from './module/auth';

export const appRoutes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'users',
    module: UserModule,
  },
];
