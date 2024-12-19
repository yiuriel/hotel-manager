import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserHasRole } from 'src/user_roles/user_has_role.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(UserHasRole)
    private readonly userHasRoleRepository: Repository<UserHasRole>,
  ) {}

  async run() {
    console.log('Clearing database...');

    await this.userRepository.delete({});
    await this.organizationRepository.delete({});
    await this.roleRepository.delete({});
    await this.userHasRoleRepository.delete({});

    console.log('Seeding database...');

    const role = this.roleRepository.create({
      name: 'admin',
    });

    const organization = this.organizationRepository.create({
      name: 'Example Organization',
    });

    // Seed users
    const user1 = this.userRepository.create({
      email: 'admin@example.com',
      passwordHash: await argon2.hash('password'),
    });

    const user2 = this.userRepository.create({
      email: 'member@example.com',
      passwordHash: await argon2.hash('password'),
    });

    user1.organization = organization;
    user2.organization = organization;

    organization.owner = user1;
    organization.users = [user1, user2];

    await this.roleRepository.save(role);
    await this.userRepository.save([user1, user2]);
    await this.organizationRepository.save(organization);

    console.log('Saving user roles...');
    console.log(organization);

    await this.userHasRoleRepository.save({
      user: user1,
      role,
      organization,
    });

    console.log('Database seeding complete.');
  }
}
