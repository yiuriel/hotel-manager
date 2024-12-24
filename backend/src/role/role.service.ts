import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async assignPermissionsToRole(roleId: string, permissionIds: string[]) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) throw new NotFoundException('Role not found');
    if (!role.editable) throw new NotFoundException('Role is not editable');

    const permissions =
      await this.permissionRepository.findByIds(permissionIds);

    role.permissions = [...role.permissions, ...permissions];
    return this.roleRepository.save(role);
  }

  async removePermissionsFromRole(roleId: string, permissionIds: string[]) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) throw new NotFoundException('Role not found');
    if (!role.editable) throw new NotFoundException('Role is not editable');

    role.permissions = role.permissions.filter(
      (perm) => !permissionIds.includes(perm.id),
    );
    return this.roleRepository.save(role);
  }

  async clearAll() {
    return this.roleRepository.delete({});
  }
}
