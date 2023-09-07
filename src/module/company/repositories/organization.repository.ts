import { EntityRepository, Repository } from 'typeorm';
import { Jobs } from '../entities/job.entity';
import { Organization } from '../entities/organization.entity';

@EntityRepository(Organization)
export class OrgRepository extends Repository<Organization> {}
