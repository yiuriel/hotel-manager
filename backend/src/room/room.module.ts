import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from 'src/amenity/entities/amenity.entity';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Amenity])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
