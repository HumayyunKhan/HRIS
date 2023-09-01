import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/module/admin/entities';
import { Organization } from 'src/module/admin/entities/organization.entity';

import { User } from 'src/module/user/user.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const isDevelopmentEnv = configService.get('env') === 'development';

    return {
      type: 'mysql',
      host: configService.get('database.host'),
      port: configService.get<number | undefined>('database.port'),
      database: "test2",
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      entities: [
      ],
      // synchronize: isDevelopmentEnv,
      logging: isDevelopmentEnv,
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
