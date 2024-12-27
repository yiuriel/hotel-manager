import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  // Enhanced Security Headers Configuration
  app.use(
    helmet({
      // Content Security Policy
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
          sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
        },
      },
      // Cross-Origin Resource Policy
      crossOriginResourcePolicy: { policy: 'same-site' },
      // Cross-Origin Opener Policy
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      // Cross-Origin Embedder Policy
      crossOriginEmbedderPolicy: { policy: 'require-corp' },
      // HTTP Strict Transport Security
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      // Disable X-Powered-By header
      hidePoweredBy: true,
      // Prevent clickjacking
      frameguard: {
        action: 'deny',
      },
      // DNS Prefetch Control
      dnsPrefetchControl: {
        allow: false,
      },
      // Referrer Policy
      referrerPolicy: {
        policy: ['no-referrer', 'strict-origin-when-cross-origin'],
      },
    }),
  );
  app.use(cookieParser());

  const seedService = app.get(SeedService);
  await seedService.run();

  await app.listen(3001);
}
bootstrap();
