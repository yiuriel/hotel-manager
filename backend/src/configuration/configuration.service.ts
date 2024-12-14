import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string | undefined {
    return this.configService.get<string>('DATABASE_URL');
  }
}
