import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { jwtConstants } from 'src/config/jwt.config';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { noop } from 'src/utils/noop';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await argon2.verify(user.passwordHash, password))) {
      const { passwordHash, ...result } = user;
      noop(passwordHash);
      return result; // Return user details without the password
    }
    return null;
  }

  async login(loginData: any, @Res({ passthrough: true }) response: Response) {
    const user = await this.validateUser(loginData.email, loginData.password);

    if (!user) {
      return false;
    }

    const payload = { email: user.email, id: user.id };
    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    });

    response.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return true;
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      return { message: 'Token is valid', id: payload.id };
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error);
    }
  }

  async register(email: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    return this.userService.createUser(email, hashedPassword);
  }

  logout(@Res({ passthrough: true }) response: Response) {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    response.clearCookie('access_token');
  }

  async getProfile(id: string) {
    const dbUser = await this.userService.findById(id);

    const userDto = plainToInstance(UserDto, dbUser, {
      excludeExtraneousValues: true,
    });

    return userDto;
  }
}
