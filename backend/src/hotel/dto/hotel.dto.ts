import { Expose, Type } from 'class-transformer';
import { UserStaffDto } from 'src/user/dto/user.staff.dto';

export class HotelDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  country: string;

  @Expose()
  postalCode: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Type(() => UserStaffDto)
  @Expose()
  staff: UserStaffDto[];

  @Expose()
  staffCount: number;
}
