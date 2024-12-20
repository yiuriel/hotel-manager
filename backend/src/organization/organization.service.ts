import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  getUserOrganization(userId: string) {
    if (!userId) {
      return null;
    }

    return this.organizationRepository.findOne({
      where: {
        users: {
          id: userId,
        },
      },
    });
  }
}
