import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRoles } from '../entities/user.roles.entity';
import { Verifications } from 'src/module/auth/entities/user.verification.entity';

@EntityRepository(Verifications)
export class UserVerificationRepository extends Repository<Verifications> {}
