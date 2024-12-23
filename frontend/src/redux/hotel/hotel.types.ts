import { Room } from "../room/room.types";

export type HotelStaff = {
  id: string;
  email: string;
  name: string;
};

export type StaffShift = {
  id: string;
  startTime: string;
  endTime: string;
  notes: string;
};

export type HotelStaffWithShifts = HotelStaff & {
  shifts: StaffShift[];
};

export type Hotel<T extends object = HotelStaff> = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  staffCount: number;
  staff: T[];
  rooms: Room[];
  roomCount: number;
};

export type HotelResponse = Hotel<HotelStaffWithShifts>;
export type ManyHotelResponse = Hotel[];

export type CreateHotelDto = Omit<
  Hotel,
  "id" | "staffCount" | "staff" | "rooms" | "roomCount"
>;
