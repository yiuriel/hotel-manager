type HotelStaff = {
  id: number;
  email: string;
  name: string;
};

type StaffShift = {
  id: string;
  startTime: string;
  endTime: string;
  notes: string;
};

type HotelStaffWithShifts = HotelStaff & {
  shifts: StaffShift[];
};

type Hotel<T extends object = HotelStaff> = {
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
};

export type HotelResponse = Hotel<HotelStaffWithShifts>;
export type ManyHotelResponse = Hotel[];
