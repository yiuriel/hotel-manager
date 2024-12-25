import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { MaintenanceRequest } from 'src/maintenance_request/entities/maintenance_request.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Permission } from 'src/permission/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Shift,
      MaintenanceRequest,
      Hotel,
      Organization,
      Permission,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [TypeOrmModule],
})
export class UserModule {}
