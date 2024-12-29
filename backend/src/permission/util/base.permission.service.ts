import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PERMISSIONS } from '../permission.constants';

@Injectable()
export class BasePermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async seedBasePermissions() {
    const dbPermissions: Permission[] = [];
    for (const permission of Object.values(PERMISSIONS)) {
      dbPermissions.push(
        this.permissionRepository.create({
          name: permission,
        }),
      );
    }

    await this.permissionRepository.save(dbPermissions);
  }
}
