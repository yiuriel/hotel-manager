import { Expose, Type } from 'class-transformer';
import { RoleDto } from 'src/role/dto/role.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class UserHasRoleDto {
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  @Type(() => RoleDto)
  @Expose()
  role: RoleDto;
}
