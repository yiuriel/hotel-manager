import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post(':roleId/permissions')
  async assignPermissions(
    @Param('roleId') roleId: string,
    @Body('permissionIds') permissionIds: string[],
  ) {
    return this.roleService.assignPermissionsToRole(roleId, permissionIds);
  }

  @Delete(':roleId/permissions')
  async removePermissions(
    @Param('roleId') roleId: string,
    @Body('permissionIds') permissionIds: string[],
  ) {
    return this.roleService.removePermissionsFromRole(roleId, permissionIds);
  }
}
