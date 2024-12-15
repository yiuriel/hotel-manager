import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service'; // Example service

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async run() {
    console.log('Clearing database...');

    await this.userService.clearAll();

    console.log('Seeding database...');

    // Seed users
    await this.authService.register('admin@example.com', 'password');
    await this.authService.register('user@example.com', 'password');

    console.log('Database seeding complete.');
  }
}
