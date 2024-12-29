import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activity/entities/activity.entity';
import { Hotel } from './entities/hotel.entity';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { Shift } from 'src/shift/entities/shift.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel, Activity, User, Permission, Role, Shift]),
  ],
  controllers: [HotelController],
  providers: [HotelService, AuthService, UserService],
})
export class HotelModule {}
