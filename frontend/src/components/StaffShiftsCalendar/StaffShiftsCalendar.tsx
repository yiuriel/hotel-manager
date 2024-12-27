import { useState } from "react";
import { Button } from "../Button/Button";
import { CalendarMonthView } from "./CalendarMonthView";
import { CalendarWeekView } from "./CalendarWeekView";
import { useAppSelector } from "../../redux/hooks";
import {
  selectSelectedStaffMember,
  selectStaffShiftsByStaffId,
} from "../../redux/hotel/hotel.slice";
import { startOfWeek } from "date-fns/startOfWeek";

export const StaffShiftsCalendar = () => {
  const selectedStaffMember = useAppSelector(selectSelectedStaffMember);
  const shifts = useAppSelector(
    selectStaffShiftsByStaffId(selectedStaffMember)
  );

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const changeDate = (difference: number) => {
    const newDate = new Date(date.getTime() + difference * 24 * 60 * 60 * 1000);
    setDate(newDate);
  };

  const changeMonth = (difference: number) => {
    setDate(new Date(date.setMonth(date.getMonth() + difference)));
  };

  const previousMonth = () => {
    if (view === "month") {
      changeMonth(-1);
    } else {
      const firstDayOfWeek = startOfWeek(new Date(date.getTime()));
      setDate(firstDayOfWeek);
      changeDate(-7);
    }
  };

  const nextMonth = () => {
    if (view === "month") {
      changeMonth(1);
    } else {
      const firstDayOfWeek = startOfWeek(new Date(date.getTime()));
      setDate(firstDayOfWeek);
      changeDate(7);
    }
  };

  const handleTodayButtonClick = () => {
    setDate(new Date());
  };

  const onDayClick = (clickedDate: Date) => {
    const firstDayOfWeek = startOfWeek(new Date(clickedDate.getTime()));
    setDate(firstDayOfWeek);
    setView("week");
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <Button
          onClick={() => setView(view === "month" ? "week" : "month")}
          className="h-8 !rounded-none font-medium text-sm"
          color="secondary"
          fullWidth
        >
          {view === "month" ? "Switch to Week View" : "Switch to Month View"}
        </Button>
      </div>
      
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Button
          onClick={previousMonth}
          className="w-8 h-8 !rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <span className="sr-only">Previous {view}</span>
          <span aria-hidden="true">&lt;</span>
        </Button>
        
        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {view === "month" ? (
              <span>
                {date.toLocaleString("default", { month: "long" })}{" "}
                {date.getFullYear()}
                {date.getMonth() !== new Date().getMonth() && (
                  <button
                    onClick={handleTodayButtonClick}
                    className="ml-2 text-sm px-2 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full transition-colors duration-150 ease-in-out"
                  >
                    Today
                  </button>
                )}
              </span>
            ) : (
              <span>
                Week {Math.ceil(date.getDate() / 7)} of{" "}
                {date.toLocaleString("default", { month: "long" })}{" "}
                {date.getFullYear()}
              </span>
            )}
          </h2>
        </div>
        
        <Button
          onClick={nextMonth}
          className="w-8 h-8 !rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <span className="sr-only">Next {view}</span>
          <span aria-hidden="true">&gt;</span>
        </Button>
      </div>

      <div className="p-4">
        {view === "month" ? (
          <CalendarMonthView
            shifts={shifts}
            date={date}
            onDayClick={onDayClick}
          />
        ) : (
          <CalendarWeekView shifts={shifts} date={date} />
        )}
      </div>
    </div>
  );
};
