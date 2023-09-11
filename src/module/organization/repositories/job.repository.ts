import { EntityRepository, Repository } from 'typeorm';
import { Jobs } from '../entities/job.entity';

@EntityRepository(Jobs)
export class JobRepository extends Repository<Jobs> {}
