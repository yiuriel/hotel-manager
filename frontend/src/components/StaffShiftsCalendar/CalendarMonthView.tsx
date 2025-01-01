import { FC } from "react";
import { isShiftDay, shiftIsWithinDay } from "./calendar.helpers";
import { StaffShift } from "../../redux/hotel/hotel.types";

export const CalendarMonthView: FC<{
  date: Date;
  shifts: StaffShift[];
  onDayClick: (date: Date) => void;
}> = ({ date, shifts, onDayClick }) => {
  return (
    <div className="select-none">
      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-1 w-12 text-sm font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 42 }).map((_, i) => {
          const dateNumber = new Date(
            date.getFullYear(),
            date.getMonth(),
            i - (new Date(date.getFullYear(), date.getMonth()).getDay() - 1)
          );
          const isToday =
            dateNumber.toDateString() === new Date().toDateString();
          const hasShift =
            shifts.some(shiftIsWithinDay(dateNumber)) ||
            isShiftDay(dateNumber, shifts);
          const isSameMonth = dateNumber.getMonth() === date.getMonth();

          return (
            <div
              key={i}
              className={`
                relative h-12 w-12 flex items-center justify-center
                text-sm font-medium rounded-md transition-all duration-150
                ${isToday ? "bg-yellow-100" : ""}
                ${hasShift ? "bg-green-100" : ""}
                ${isToday && hasShift ? "bg-lime-200" : ""}
                ${isSameMonth ? "text-gray-900" : "text-gray-400"}
                ${
                  isSameMonth
                    ? "hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm"
                    : "hover:text-gray-600"
                }
                cursor-pointer
              `}
              onClick={() => onDayClick(dateNumber)}
            >
              <span
                className={`
                ${
                  isToday
                    ? "w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-yellow-900"
                    : ""
                }
              `}
              >
                {dateNumber.getDate()}
              </span>
              {hasShift && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-green-500"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
