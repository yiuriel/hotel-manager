import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from '../user/user.module';
import { SeedService } from './seed.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AuthModule],
  providers: [SeedService, UserService, AuthService, JwtService],
  exports: [SeedService],
})
export class SeedModule {}
