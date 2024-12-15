import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceRequestDto } from './create-maintenance_request.dto';

export class UpdateMaintenanceRequestDto extends PartialType(CreateMaintenanceRequestDto) {}
