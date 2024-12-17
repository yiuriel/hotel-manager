import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { jwtConstants } from 'src/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await argon2.verify(user.passwordHash, password))) {
      const { passwordHash, ...result } = user;
      return result; // Return user details without the password
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    });
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      return { message: 'Token is valid' };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async register(email: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    return this.userService.createUser(email, hashedPassword);
  }
}
