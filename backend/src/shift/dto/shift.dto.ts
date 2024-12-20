import { Expose } from 'class-transformer';

export class ShiftDto {
  @Expose()
  id: string;

  @Expose()
  startTime: string;

  @Expose()
  endTime: string;

  @Expose()
  notes: string;
}
