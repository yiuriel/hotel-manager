import { Exclude, Expose, Type } from 'class-transformer';
import { RoleDto } from 'src/role/dto/role.dto';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Type(() => RoleDto)
  @Expose()
  roles: RoleDto[];

  @Exclude()
  password: string; // Exclude sensitive data
}
