import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { AmenityModule } from './amenity/amenity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomThrottlerGuard } from './common/guards/throttler.guard';
import { EventsModule } from './events/events.module';
import { GuestModule } from './guest/guest.module';
import { GuestReviewModule } from './guest_review/guest_review.module';
import { HotelModule } from './hotel/hotel.module';
import { MaintenanceRequestModule } from './maintenance_request/maintenance_request.module';
import { OrganizationModule } from './organization/organization.module';
import { PaymentModule } from './payment/payment.module';
import { PermissionModule } from './permission/permission.module';
import { ReservationModule } from './reservation/reservation.module';
import { RoleModule } from './role/role.module';
import { RoomModule } from './room/room.module';
import { SeedModule } from './seed/seed.module';
import { ShiftModule } from './shift/shift.module';
import { UserModule } from './user/user.module';

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
        dropSchema: true,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HotelModule,
    RoomModule,
    ActivityModule,
    ShiftModule,
    AmenityModule,
    MaintenanceRequestModule,
    ReservationModule,
    GuestModule,
    PaymentModule,
    GuestReviewModule,
    forwardRef(() => OrganizationModule),
    forwardRef(() => UserModule),
    RoleModule,
    AuthModule,
    SeedModule,
    PermissionModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 60,
      },
    ]),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
