export class CreateRoomDto {
  roomNumber: string;
  roomType: string;
  capacity: number;
  pricePerNight: number;
  description: string;
  isAvailable: boolean;
}
