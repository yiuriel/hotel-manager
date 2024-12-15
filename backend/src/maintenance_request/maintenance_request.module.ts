import { Module } from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance_request.service';
import { MaintenanceRequestController } from './maintenance_request.controller';

@Module({
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService],
})
export class MaintenanceRequestModule {}
