import { Exclude, Expose } from 'class-transformer';

export class PermissionDto {
  @Exclude()
  id: string;

  @Expose()
  name: string;
}
