import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { jwtConstants } from '../config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    UserModule, // Import your user module
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
