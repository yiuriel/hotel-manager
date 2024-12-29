import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
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

  async createOrganization(
    user: CreateUserDto,
    organizationData: CreateOrganizationDto,
  ) {
    return this.organizationRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const existingUser = await transactionalEntityManager
          .getRepository(User)
          .findOne({
            where: { email: user.email },
          });

        if (existingUser) {
          throw new Error('User already exists');
        }

        const organization = transactionalEntityManager.create(Organization, {
          ...organizationData,
        });

        const { password, ...userWithoutPassword } = user;
        const passwordHash = await argon2.hash(password);

        const newUser = transactionalEntityManager.create(User, {
          ...userWithoutPassword,
          organization: { id: organization.id },
          passwordHash: passwordHash,
        });

        // @TODO: Add role to user

        organization.users = [newUser];
        organization.owner = newUser;

        await transactionalEntityManager.save(newUser);
        await transactionalEntityManager.save(organization);

        return organization;
      },
    );
  }
}
