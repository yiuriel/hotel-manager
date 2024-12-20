import { Expose, Type } from 'class-transformer';
import { ShiftDto } from 'src/shift/dto/shift.dto';

export class UserStaffDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Type(() => ShiftDto)
  @Expose()
  shifts: ShiftDto[];
}
