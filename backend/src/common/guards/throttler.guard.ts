import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected skipCheck(context: any) {
    // Skip rate limiting for health checks and other public endpoints
    const request = context.switchToHttp().getRequest();
    const publicPaths = ['/health', '/public'];
    return publicPaths.some((path) => request.path.includes(path));
  }
}
