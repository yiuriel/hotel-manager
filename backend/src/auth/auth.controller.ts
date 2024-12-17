import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.authService.login(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return res.json({ message: 'Login successful' });
  }

  @Post('verify')
  async verifyToken(@Request() req: any) {
    const token = req.headers.cookie?.split(';')?.[0]?.split('=')?.[1];

    return this.authService.verifyToken(token);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    console.log(req.user);

    return req.user;
  }
}
