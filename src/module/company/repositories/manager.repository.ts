import { EntityRepository, Repository } from 'typeorm';
import { Jobs } from '../entities/job.entity';
import { Manager } from '../entities/manager.entity';

@EntityRepository(Jobs)
export class ManagerRepo extends Repository<Manager> {}
