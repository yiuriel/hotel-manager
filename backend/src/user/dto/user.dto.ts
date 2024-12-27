import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { OrganizationDto } from 'src/organization/dto/organization.dto';
import { PermissionDto } from 'src/permission/dto/permission.dto';
import { ShiftDto } from 'src/shift/dto/shift.dto';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => {
    return {
      name: obj?.role?.name,
      description: obj?.role?.description,
      editable: obj?.role?.editable,
      permissions: obj?.role?.permissions.map((permission: PermissionDto) => ({
        name: permission.name,
      })),
    };
  })
  role: {
    name: string;
    description: string;
    editable: boolean;
    permissions: {
      name: string;
    }[];
  }; // Flatten roles into an array of role names

  @Type(() => PermissionDto)
  @Expose()
  permissions: PermissionDto;

  @Type(() => OrganizationDto)
  @Expose()
  organization: OrganizationDto;

  @Type(() => ShiftDto)
  @Expose()
  shifts: ShiftDto[];

  @Expose()
  userIsAssignedToHotel?: boolean;

  @Exclude()
  password: string; // Exclude sensitive data
}
