import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { Shift } from './entities/shift.entity';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shift]), EventsModule],
  controllers: [ShiftController],
  providers: [ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
