import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { AmenityModule } from './amenity/amenity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule } from './guest/guest.module';
import { GuestReviewModule } from './guest_review/guest_review.module';
import { HotelModule } from './hotel/hotel.module';
import { MaintenanceRequestModule } from './maintenance_request/maintenance_request.module';
import { OrganizationModule } from './organization/organization.module';
import { PaymentModule } from './payment/payment.module';
import { ReservationModule } from './reservation/reservation.module';
import { RoleModule } from './role/role.module';
import { RoomModule } from './room/room.module';
import { ShiftModule } from './shift/shift.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { PermissionModule } from './permission/permission.module';
import { CustomThrottlerGuard } from './common/guards/throttler.guard';
import { ThrottlerModule } from '@nestjs/throttler';

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
    OrganizationModule,
    UserModule,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    RoleService,
    SeedService,
    {
      provide: 'APP_GUARD',
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
