

import * as dotenv from 'dotenv';
import { User } from 'src/module/user/entities/user.entity';
import { UserRoles } from 'src/module/user/entities/user.roles.entity';
dotenv.config();

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false, 
  timezone: 'utc',
  entities: [
  

  ],
  // migrations: ['src/database/migrations/*{.ts,.js}'],
};
