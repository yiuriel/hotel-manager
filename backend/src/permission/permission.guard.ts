import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required permissions from metadata
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true; // If no permissions are set, allow access
    }

    // Get the user's permissions from the request
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (!user?.id) {
      throw new ForbiddenException(
        'User not authenticated or permissions missing',
      );
    }

    const dbUser = await this.authService.getProfile(user.id);

    if (!dbUser) {
      throw new ForbiddenException('User not found');
    }

    console.log(dbUser);

    const hasPermission = requiredPermissions.every((permission) => {
      const userPermissions = [...dbUser.role.permissions.map((perm) => perm)];

      return userPermissions.some((perm) => perm.name === permission);
    });

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
