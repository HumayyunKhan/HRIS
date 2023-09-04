import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRoles } from '../entities/user.roles.entity';

@EntityRepository(UserRoles)
export class UserRoleRepository extends Repository<UserRoles> {}
