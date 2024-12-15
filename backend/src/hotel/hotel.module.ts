import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activity/entities/activity.entity';
import { Hotel } from './entities/hotel.entity';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Activity])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
