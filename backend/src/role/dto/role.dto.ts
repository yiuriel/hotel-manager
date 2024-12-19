import { Exclude, Expose } from 'class-transformer';

export class RoleDto {
  @Exclude()
  id: string;

  @Expose()
  name: string;
}
