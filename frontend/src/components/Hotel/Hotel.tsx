import { FC } from "react";
import { HotelResponse } from "../../redux/hotel/hotel.types";
import { StaffShiftsCalendar } from "../StaffShiftsCalendar/StaffShiftsCalendar";
import { HotelInfoCard } from "./HotelInfoCard";

export const Hotel: FC<{ hotel: HotelResponse }> = ({ hotel }) => {
  if (!hotel) {
    return null;
  }

  return (
    <div className="flex flex-row gap-4 mt-4 mx-4">
      <div className="w-1/2">
        <HotelInfoCard />
      </div>
      <div className="w-1/2">
        <StaffShiftsCalendar />
      </div>
    </div>
  );
};
