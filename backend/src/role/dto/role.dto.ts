import { Exclude, Expose, Type } from 'class-transformer';
import { PermissionDto } from 'src/permission/dto/permission.dto';

export class RoleDto {
  @Exclude()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  editable: boolean;

  @Type(() => PermissionDto)
  @Expose()
  permissions: PermissionDto[];
}
