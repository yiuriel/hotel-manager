import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { AmenityModule } from './amenity/amenity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotel/hotel.module';
import { MaintenanceRequestModule } from './maintenance_request/maintenance_request.module';
import { RoomModule } from './room/room.module';
import { ShiftModule } from './shift/shift.module';
import { StaffModule } from './staff/staff.module';
import { ReservationModule } from './reservation/reservation.module';
import { GuestModule } from './guest/guest.module';
import { PaymentModule } from './payment/payment.module';
import { GuestReviewModule } from './guest_review/guest_review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available across all modules
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HotelModule,
    RoomModule,
    StaffModule,
    ActivityModule,
    ShiftModule,
    AmenityModule,
    MaintenanceRequestModule,
    ReservationModule,
    GuestModule,
    PaymentModule,
    GuestReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
