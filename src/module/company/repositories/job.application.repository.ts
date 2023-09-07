import { EntityRepository, Repository } from 'typeorm';
import { Jobs } from '../entities/job.entity';
import { JobApplications } from '../entities/job.applications.entity';

@EntityRepository(JobApplications)
export class ApplicationRepository extends Repository<JobApplications> {}
