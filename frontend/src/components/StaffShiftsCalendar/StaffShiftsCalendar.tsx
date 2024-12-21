import { useState } from "react";
import { Button } from "../Button/Button";
import { CalendarMonthView } from "./CalendarMonthView";
import { CalendarWeekView } from "./CalendarWeekView";
import { useAppSelector } from "../../redux/hooks";
import {
  selectSelectedStaffMember,
  selectStaffShiftsByStaffId,
} from "../../redux/hotel/hotel.slice";

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
      changeDate(-7);
    }
  };

  const nextMonth = () => {
    if (view === "month") {
      changeMonth(1);
    } else {
      changeDate(7);
    }
  };

  const handleTodayButtonClick = () => {
    setDate(new Date());
  };

  if (!selectedStaffMember) {
    return null;
  }

  return (
    <div className="flex flex-col shadow-md rounded-sm">
      <Button
        onClick={() => setView(view === "month" ? "week" : "month")}
        className="h-6 !rounded-none"
        color="secondary"
        fullWidth
      >
        {view === "month" ? "Week" : "Month"}
      </Button>
      <div className="flex justify-between">
        <Button onClick={previousMonth} className="w-10 h-10 !rounded-none">
          &lt;
        </Button>
        <div className="flex-1 flex-nowrap flex text-center justify-center items-center">
          {view === "month" ? (
            <div>
              {date.toLocaleString("default", { month: "long" })}{" "}
              {date.getFullYear()}
              {date.getMonth() !== new Date().getMonth() && (
                <small
                  onClick={handleTodayButtonClick}
                  className="cursor-pointer bg-yellow-200 px-2 py-1 rounded-sm ml-2"
                >
                  jump to Today
                </small>
              )}
            </div>
          ) : (
            <div>
              Week {Math.ceil(date.getDate() / 7)} of{" "}
              {date.toLocaleString("default", { month: "long" })}{" "}
              {date.getFullYear()}
            </div>
          )}
        </div>
        <Button onClick={nextMonth} className="w-10 h-10 !rounded-none">
          &gt;
        </Button>
      </div>
      {view === "month" ? (
        <CalendarMonthView shifts={shifts} date={date} />
      ) : (
        <CalendarWeekView shifts={shifts} date={date} />
      )}
    </div>
  );
};
