import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Sessions } from 'src/module/auth/entities/user.session.entity';

@EntityRepository(Sessions)
export class UserSessionsRepository extends Repository<Sessions> {}
