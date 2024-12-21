import { FC } from "react";
import { isShiftDay, shiftIsWithinDay } from "./calendar.helpers";
import { StaffShift } from "../../redux/hotel/hotel.types";

export const CalendarMonthView: FC<{
  date: Date;
  shifts: StaffShift[];
}> = ({ date, shifts }) => {
  return (
    <div className="grid grid-cols-7 gap-2 place-items-center">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="text-center w-10 h-10 flex items-center justify-center"
        >
          {day}
        </div>
      ))}
      {Array.from({ length: 42 }).map((_, i) => {
        const dateNumber = new Date(
          date.getFullYear(),
          date.getMonth(),
          i - (new Date(date.getFullYear(), date.getMonth()).getDay() - 1)
        );
        const isToday = dateNumber.toDateString() === new Date().toDateString();
        const hasShift =
          shifts.some(shiftIsWithinDay(dateNumber)) ||
          isShiftDay(dateNumber, shifts);
        const isSameMonth = dateNumber.getMonth() === date.getMonth();

        return (
          <div
            key={i}
            className={`${isToday ? "bg-yellow-500" : ""} ${
              hasShift ? "bg-green-300 bg-opacity-50" : ""
            } ${
              isSameMonth ? "" : "text-gray-400"
            } text-center w-10 h-10 flex items-center justify-center`}
          >
            {dateNumber.getDate()}
          </div>
        );
      })}
    </div>
  );
};
