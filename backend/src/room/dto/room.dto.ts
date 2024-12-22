import { Expose } from 'class-transformer';

export class RoomDto {
  @Expose()
  id: string;

  @Expose()
  roomNumber: string;

  @Expose()
  roomType: string;

  @Expose()
  capacity: number;

  @Expose()
  pricePerNight: number;

  @Expose()
  description: string;

  @Expose()
  isAvailable: boolean;
}
