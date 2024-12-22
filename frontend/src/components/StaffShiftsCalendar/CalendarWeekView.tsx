import { FC } from "react";
import { StaffShift } from "../../redux/hotel/hotel.types";
import { shiftIsWithinDate } from "./calendar.helpers";

export const CalendarWeekView: FC<{ shifts: StaffShift[]; date: Date }> = ({
  shifts,
  date,
}) => {
  return (
    <table className="w-full border-separate border-spacing-0 border border-purple-500">
      <thead>
        <tr>
          <th className="border border-purple-500"></th>
          {Array.from({ length: 7 }).map((_, i) => {
            const dateOfWeek = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + i - new Date().getDay()
            );
            return (
              <th key={i} className="border border-purple-500">
                <div className="flex flex-col">
                  <span>
                    {dateOfWeek.toLocaleString("default", { weekday: "short" })}
                  </span>
                  {dateOfWeek.getDate()}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 24 }).map((_, currentHour) => (
          <tr key={currentHour}>
            <td className="border border-purple-500 text-center">
              {currentHour === 0
                ? `12 am`
                : currentHour < 12
                ? `${currentHour < 10 ? `0${currentHour}` : currentHour} am`
                : currentHour === 12
                ? `12 pm`
                : `${
                    currentHour - 12 < 10
                      ? `0${currentHour - 12}`
                      : currentHour - 12
                  } pm`}
            </td>
            {Array.from({ length: 7 }).map((_, currentDayOfWeek) => {
              const dateNumber = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + currentDayOfWeek - (new Date().getDay() - 1)
              );

              dateNumber.setHours(currentHour);
              const isToday =
                dateNumber.toDateString() === new Date().toDateString() &&
                currentHour === new Date().getHours();
              const hasShift = shifts.some(
                shiftIsWithinDate(dateNumber, currentHour)
              );

              return (
                <td
                  key={currentDayOfWeek}
                  className={`border border-purple-500 h-8 w-12 ${
                    isToday ? "bg-yellow-500" : ""
                  } ${hasShift ? "bg-green-300 bg-opacity-50" : ""}`}
                ></td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
