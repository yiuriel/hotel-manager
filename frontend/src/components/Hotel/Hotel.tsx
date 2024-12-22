import { FC } from "react";
import { HotelResponse } from "../../redux/hotel/hotel.types";
import { StaffShiftsCalendar } from "../StaffShiftsCalendar/StaffShiftsCalendar";
import { HotelInfoCard } from "./HotelInfoCard";
import { HotelRoomsCard } from "./HotelRoomsCard";

export const Hotel: FC<{ hotel: HotelResponse }> = ({ hotel }) => {
  if (!hotel) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 mx-4">
      <HotelInfoCard />
      <StaffShiftsCalendar />
      <HotelRoomsCard />
    </div>
  );
};
