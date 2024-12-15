import { Module } from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance_request.service';
import { MaintenanceRequestController } from './maintenance_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import { User } from 'src/user/entities/user.entity';
import { MaintenanceRequest } from './entities/maintenance_request.entity';
import { Room } from 'src/room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRequest, Room])],
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService],
})
export class MaintenanceRequestModule {}
