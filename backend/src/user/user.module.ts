import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import { MaintenanceRequest } from 'src/maintenance_request/entities/maintenance_request.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Shift,
      MaintenanceRequest,
      Role,
      Hotel,
      Organization,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
