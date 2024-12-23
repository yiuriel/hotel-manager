import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { OrganizationDto } from 'src/organization/dto/organization.dto';
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
    return obj?.roles?.map((userRole: any) => userRole.role.name);
  })
  roles: string[]; // Flatten roles into an array of role names

  @Type(() => OrganizationDto)
  @Expose()
  organization: OrganizationDto;

  @Type(() => ShiftDto)
  @Expose()
  shifts: ShiftDto[];

  @Exclude()
  password: string; // Exclude sensitive data
}
