import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { BasePermissionService } from './permission/util/base.permission.service';
import { BaseRoleService } from './role/util/base.role.service';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  // Enhanced Security Headers Configuration
  app.use(helmet());
  app.use(cookieParser());

  const permissionService = app.get(BasePermissionService);
  await permissionService.seedBasePermissions();

  const baseRoleService = app.get(BaseRoleService);
  await baseRoleService.seedBaseRoles();

  const seedService = app.get(SeedService);
  await seedService.run();

  await app.listen(3001);
}
bootstrap();
