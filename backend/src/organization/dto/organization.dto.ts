import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';

export class OrganizationDto {
  @Expose()
  name: string;

  @Type(() => UserDto)
  @Expose()
  owner: UserDto;
}
