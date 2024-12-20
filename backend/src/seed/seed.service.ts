import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserHasRole } from 'src/user_roles/user_has_role.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Hotel } from 'src/hotel/entities/hotel.entity';

const userUUID = '5bb911b0-8396-4456-b55b-f931963ee3f0';
const orgUUID = '5bb911b0-8396-4456-b55b-f931963ee3f1';
const roleUUID = '5bb911b0-8396-4456-b55b-f931963ee3f2';
const hotelUUID = '5bb911b0-8396-4456-b55b-f931963ee3f3';

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

    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async run() {
    console.log('Clearing database...');

    await this.userRepository.delete({});
    await this.organizationRepository.delete({});
    await this.roleRepository.delete({});
    await this.userHasRoleRepository.delete({});
    await this.hotelRepository.delete({});

    console.log('Seeding database...');

    const role = this.roleRepository.create({
      id: roleUUID,
      name: 'admin',
    });

    const hotel = this.hotelRepository.create({
      id: hotelUUID,
      name: 'Example Hotel',
      address: '123 Main St',
      city: 'Example City',
      state: 'Example State',
      country: 'Example Country',
      postalCode: '12345',
      phone: '123-456-7890',
    });

    const hotel2 = this.hotelRepository.create({
      name: 'Example Hotel 2',
      address: '123 Main St',
      city: 'Example City',
      state: 'Example State',
      country: 'Example Country',
      postalCode: '12345',
      phone: '123-456-7890',
    });

    const organization = this.organizationRepository.create({
      id: orgUUID,
      name: 'Example Organization',
    });

    organization.hotels = [hotel, hotel2];

    await this.hotelRepository.save([hotel, hotel2]);

    // Seed users
    const user1 = this.userRepository.create({
      id: userUUID,
      email: 'admin@example.com',
      passwordHash: await argon2.hash('password'),
    });

    const user2 = this.userRepository.create({
      email: 'member@example.com',
      passwordHash: await argon2.hash('password'),
    });

    organization.owner = user1;
    organization.users = [user1, user2];

    await this.roleRepository.save(role);
    await this.userRepository.save([user1, user2]);
    await this.organizationRepository.save(organization);

    hotel.organization = organization;
    hotel2.organization = organization;
    user1.organization = organization;
    user2.organization = organization;

    await this.hotelRepository.save(hotel);
    await this.userRepository.save([user1, user2]);

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
