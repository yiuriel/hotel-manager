import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { PermissionType } from 'src/permission/permission.constants';
import { Like, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class BaseRoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async seedBaseRoles(organizationId?: string) {
    const roles = await this.roleRepository.create([
      { name: 'owner', editable: false },
      { name: 'admin', editable: true },
      { name: 'member', editable: true },
    ]);

    if (organizationId) {
      roles[0].organization.id = organizationId;
      roles[1].organization.id = organizationId;
      roles[2].organization.id = organizationId;
    }

    roles[0].permissions = await this.permissionRepository.find();
    roles[1].permissions = await this.permissionRepository.find({
      where: [
        {
          name: Like('%update%' as PermissionType),
        },
        {
          name: Like('%read%' as PermissionType),
        },
      ],
    });
    roles[2].permissions = await this.permissionRepository.find({
      where: {
        name: Like('%read%' as PermissionType),
      },
    });

    await this.roleRepository.save(roles);
  }

  async createBaseRoles() {
    const roles = this.roleRepository.create([
      { name: 'owner', editable: false },
      { name: 'admin', editable: true },
      { name: 'member', editable: true },
    ]);

    roles[0].permissions = await this.permissionRepository.find();
    roles[1].permissions = await this.permissionRepository.find({
      where: [
        {
          name: Like('%update%' as PermissionType),
        },
        {
          name: Like('%read%' as PermissionType),
        },
      ],
    });
    roles[2].permissions = await this.permissionRepository.find({
      where: {
        name: Like('%read%' as PermissionType),
      },
    });

    return roles;
  }

  async seedOrganizationRoles(organizationId: string) {
    const roles = await this.roleRepository.find({
      where: { organization: { id: organizationId } },
    });

    if (roles.length === 0) {
      await this.seedBaseRoles(organizationId);
    }
  }
}
