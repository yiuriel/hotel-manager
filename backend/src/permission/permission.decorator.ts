import { SetMetadata } from '@nestjs/common';
import { PermissionType } from './permission.constants';

export const Permissions = (...permissions: PermissionType[]) =>
  SetMetadata('permissions', permissions);
