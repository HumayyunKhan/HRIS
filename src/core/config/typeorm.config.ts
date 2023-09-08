import { Session } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Sessions } from 'src/module/auth/entities/user.session.entity';
import { Employee } from 'src/module/company/entities/employee.entity';
import { JobApplications } from 'src/module/company/entities/job.applications.entity';
import { Jobs } from 'src/module/company/entities/job.entity';
import { Organization } from 'src/module/company/entities/organization.entity';

import { User } from 'src/module/user/entities/user.entity';
import { UserRoles } from 'src/module/user/entities/user.roles.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const isDevelopmentEnv = configService.get('env') === 'development';

    return {
      type: 'mysql',
      host: configService.get('database.host'),
      port: configService.get<number | undefined>('database.port'),
      database: configService.get('database.name'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      entities: [
        User,
        UserRoles,
        Jobs,
        JobApplications,
        Organization,
        Employee,
        Sessions
      ],
      synchronize: true,
      // logging: isDevelopmentEnv,
      supportBigNumbers: true,
      bigNumberStrings: false,
      // keepConnectionAlive: isDevelopmentEnv,
      // namingStrategy: new TypeOrmNamingStrategy(),

      // Timezone configured on the MySQL server. This is used to typecast server date/time values to JavaScript Date object and vice versa.
      timezone: 'Z',
      
      // debug: isDevelopmentEnv,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
};
