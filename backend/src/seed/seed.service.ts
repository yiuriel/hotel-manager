import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import { Room } from 'src/room/entities/room.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { PERMISSIONS } from 'src/permission/permission.constants';

const userUUID = '5bb911b0-8396-4456-b55b-f931963ee3f0';
const userMemberUUID = '5bb911b0-8396-4456-b55b-f931963ee3f7';
const orgUUID = '5bb911b0-8396-4456-b55b-f931963ee3f1';
const roleUUID = '5bb911b0-8396-4456-b55b-f931963ee3f2';
const roleMemberUUID = '5bb911b0-8396-4456-b55b-f931963ee3f6';
const hotelUUID = '5bb911b0-8396-4456-b55b-f931963ee3f3';
const shiftUUID1 = '5bb911b0-8396-4456-b55b-f931963ee3f4';
const shiftUUID2 = '5bb911b0-8396-4456-b55b-f931963ee3f5';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,

    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async run() {
    console.log('Clearing database...');

    await this.userRepository.delete({});
    await this.organizationRepository.delete({});
    await this.permissionRepository.delete({});
    await this.roleRepository.delete({});
    await this.hotelRepository.delete({});
    await this.shiftRepository.delete({});
    await this.roomRepository.delete({});

    console.log('Seeding database...');

    // Seed permissions
    const dbPermissions: Permission[] = [];
    for (const permission of Object.values(PERMISSIONS)) {
      dbPermissions.push(
        this.permissionRepository.create({
          name: permission,
        }),
      );
    }

    await this.permissionRepository.save(dbPermissions);

    const role = this.roleRepository.create({
      id: roleUUID,
      name: 'admin',
      editable: false,
      permissions: dbPermissions,
    });

    const memberRole = this.roleRepository.create({
      id: roleMemberUUID,
      name: 'member',
      description: 'Member role',
      editable: true,
      permissions: dbPermissions.filter((p) => p.name.includes('read')),
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

    organization.roles = [role, memberRole];
    organization.hotels = [hotel, hotel2];

    await this.hotelRepository.save([hotel, hotel2]);

    // Seed users
    const user1 = this.userRepository.create({
      id: userUUID,
      email: 'admin@example.com',
      passwordHash: await argon2.hash('password'),
      name: 'John Doe',
      phone: '123-456-7890',
      role: role,
    });

    const user2 = this.userRepository.create({
      id: userMemberUUID,
      email: 'member@example.com',
      name: 'Jane Doe',
      passwordHash: await argon2.hash('password'),
      role: memberRole,
      permissions: [dbPermissions.find((p) => p.name === 'create:hotel')!],
    });

    organization.owner = user1;
    organization.users = [user1, user2];

    await this.roleRepository.save([role, memberRole]);
    await this.userRepository.save([user1, user2]);
    await this.organizationRepository.save(organization);

    const room1 = this.roomRepository.create({
      id: '5bb911b0-8396-4456-b55b-f931963ee3f6',
      roomNumber: 'Room 1',
      roomType: 'Standard',
      pricePerNight: 50,
      capacity: 10,
      hotel,
    });

    const room2 = this.roomRepository.create({
      id: '5bb911b0-8396-4456-b55b-f931963ee3f7',
      roomNumber: 'Room 2',
      roomType: 'Deluxe',
      pricePerNight: 100,
      capacity: 4,
      hotel,
    });

    await this.roomRepository.save([room1, room2]);

    hotel.rooms = [room1, room2];
    hotel.staff = [user1, user2];
    await this.hotelRepository.save(hotel);

    console.log('Saving shifts...');

    // Seed shifts
    const shift1 = this.shiftRepository.create({
      id: shiftUUID1,
      notes: 'Morning Shift',
      startTime: new Date('2024-12-21T08:00:00Z'),
      endTime: new Date('2024-12-21T16:00:00Z'),
      hotel,
    });

    const shift2 = this.shiftRepository.create({
      id: shiftUUID2,
      notes: 'Evening Shift',
      startTime: new Date('2024-12-21T16:00:00Z'),
      endTime: new Date('2024-12-22T00:00:00Z'),
      hotel,
    });

    const shift3 = this.shiftRepository.create({
      notes: 'Full day Shift',
      startTime: new Date('2024-12-24T00:00:00Z'),
      endTime: new Date('2024-12-25T08:00:00Z'),
      hotel,
    });

    await this.shiftRepository.save([shift1, shift2, shift3]);

    console.log('Assigning users to shifts...');

    shift1.users = [user1];
    shift2.users = [user2];
    shift3.users = [user1];
    await this.shiftRepository.save([shift1, shift2, shift3]);

    console.log('Database seeding complete.');
  }
}
