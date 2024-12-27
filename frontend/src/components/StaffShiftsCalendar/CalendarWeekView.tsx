import { FC } from "react";
import { StaffShift } from "../../redux/hotel/hotel.types";
import { shiftIsWithinDate } from "./calendar.helpers";

export const CalendarWeekView: FC<{ shifts: StaffShift[]; date: Date }> = ({
  shifts,
  date,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-r border-gray-200 bg-gray-50 p-2 w-8"></th>
            {Array.from({ length: 7 }).map((_, i) => {
              const dateOfWeek = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + i - new Date().getDay()
              );
              const isToday =
                dateOfWeek.toDateString() === new Date().toDateString();

              return (
                <th
                  key={i}
                  className={`
                    border-b border-r border-gray-200 p-2 min-w-[60px]
                    ${isToday ? "bg-yellow-50" : "bg-gray-50"}
                  `}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {dateOfWeek.toLocaleString("default", {
                        weekday: "short",
                      })}
                    </span>
                    <span
                      className={`
                      text-base font-semibold mt-1
                      ${isToday ? "text-yellow-800" : "text-gray-900"}
                    `}
                    >
                      {dateOfWeek.getDate()}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 24 }).map((_, currentHour) => (
            <tr key={currentHour} className="group">
              <td className="border-r border-b border-gray-200 p-1 text-center bg-gray-50">
                <span className="text-sm font-medium text-gray-600 text-nowrap">
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
                </span>
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
                    className={`border-r border-b border-gray-200 h-3 relative
                      group-hover:bg-gray-50
                      ${isToday ? "bg-yellow-100" : ""}
                      ${hasShift ? "bg-green-100" : ""}
                      ${hasShift && isToday ? "bg-lime-200" : ""}`}
                  >
                    {hasShift && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
