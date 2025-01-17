import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from 'src/amenity/entities/amenity.entity';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Amenity, Reservation])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [TypeOrmModule],
})
export class RoomModule {}
