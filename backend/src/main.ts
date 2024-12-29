import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
// import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    // exposedHeaders: ['Content-Type'],
  });

  // Enhanced Security Headers Configuration
  // app.use(helmet());
  app.use(cookieParser());

  const seedService = app.get(SeedService);
  await seedService.run();

  await app.listen(3001);
}
bootstrap();
