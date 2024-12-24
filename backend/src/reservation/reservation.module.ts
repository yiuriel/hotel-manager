import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Guest } from 'src/guest/entities/guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Guest])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
