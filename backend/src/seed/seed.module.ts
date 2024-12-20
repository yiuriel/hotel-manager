import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { SeedService } from './seed.service';
import { User } from 'src/user/entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role/entities/role.entity';
import { UserHasRole } from 'src/user_roles/user_has_role.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Organization, Role, UserHasRole, Hotel]),
  ],
  providers: [SeedService, UserService],
  exports: [SeedService],
})
export class SeedModule {}
