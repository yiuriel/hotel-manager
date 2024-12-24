import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { Room } from 'src/room/entities/room.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Organization,
      Permission,
      Role,
      Hotel,
      Shift,
      Room,
    ]),
  ],
  providers: [SeedService, UserService],
  exports: [SeedService],
})
export class SeedModule {}
