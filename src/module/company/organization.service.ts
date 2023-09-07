import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JOB, NotFoundException, ROLE, UnAuthorizedException } from '../../shared';
import * as DTO from './dtos';
// import { User } from './entities/job.entity';
import { JobRepository } from './repositories/job.repository';
import * as bcrypt from 'bcrypt';
import { OrgRepository } from './repositories/organization.repository';
import { randomUUID } from 'crypto';
import { ApplicationRepository } from './repositories/job.application.repository';

@Injectable()
export class OrganizationService {
  async CloseJob(id: number) {
    const job: any = await this.findJob({ where: { id }, loadRelationIds: true })
    if (job.employer != id) throw new UnAuthorizedException("You are not authorized to close this job")
    await this.jobRepository.update({ id }, { status: JOB.CLOSED })
    return { data: {}, message: "Job successfully closed" }
  }
  async CreateJob(id: number, data: any) {
    data["employer"] = {}
    data.employer.id = id
    const job = this.jobRepository.create(data)
    await this.jobRepository.save(job)
    return { data: job, message: "Jobs successfully fetched" }
  }
  async FetchJobs() {
    const jobs = await this.jobRepository.find({ relations: ["employer"] })
    jobs.map(async (job) => {
      job["employerName"] = job.employer.name;
      job["employerImage"] = job.employer.imageUrl;
      delete job.employer;
    })
    return { data: jobs, message: "Jobs successfully fetched" }
  }

  constructor(
    private readonly jobRepository: JobRepository,
    private readonly applicationRepo: ApplicationRepository,
    private readonly orgRepository: OrgRepository

  ) { }

  test(req: any) {
    return { data: "HELLO WORLD", message: "ITS WORKS FOR THIS ROUTE" }
    // throw new Error('Method not implemented.'); 
  }
  async createOrganization(orgDto: DTO.CreateOrgDto) {
    orgDto["registration"] = randomUUID()
    const orgExist = await this.orgRepository.findOne({ where: { name: orgDto.name } })
    console.log(orgExist)
    if (orgExist) throw new UnAuthorizedException("An organization is already regsitered with this name")
    const organization = this.orgRepository.create(orgDto)
    await this.orgRepository.save(organization)
    return organization

    // throw new Error('Method not implemented.'); 
  }
  async updateOrganization(orgDto: DTO.UpdateOrgDto,id:number) {
    // orgDto["registration"] = randomUUID()
    const orgExist = await this.findOrg({where:{id}})
    // console.log(orgExist)
    const organization = await this.orgRepository.update({id},orgDto)
    return 

    // throw new Error('Method not implemented.'); 
  }
  async deleteOrganization(id:number) {
    // orgDto["registration"] = randomUUID()
  await this.orgRepository.softDelete({id})
    // console.log(orgExist)
    
    return {}

    // throw new Error('Method not implemented.'); 
  }

  async findJob(query: any) {
    const job = await this.jobRepository.findOne(query)
    if (!job) throw new BadRequestException("job not found")
    return job
  }
  async findOrg(query: any) {
    const job = await this.orgRepository.findOne(query)
    if (!job) {throw new BadRequestException("organization not found")}
    return job
  }
  async JobApplication(application: DTO.applicationDto) {
    const applied=await this.applicationRepo.findOne({where:{job:application.job}})
    if(applied)throw new UnauthorizedException("Already applied")
    const job =  this.applicationRepo.create(application)
    if (!job) {throw new BadRequestException("organization not found")}
    await this.applicationRepo.save(job)
    return job
  }


}
