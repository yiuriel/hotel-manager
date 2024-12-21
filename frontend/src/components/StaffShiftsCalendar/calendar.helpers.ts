import { parseISO } from "date-fns";
import { StaffShift } from "../../redux/hotel/hotel.types";

export function shiftIsWithinDate(
  dateNumber: Date,
  currentHour: number
): (value: StaffShift, index: number, array: StaffShift[]) => unknown {
  return (shift) => {
    const shiftStartDate = parseISO(shift.startTime);
    const shiftEndDate = parseISO(shift.endTime);

    const isSameDayOrBeforeEndDate =
      dateNumber.getTime() >= shiftStartDate.getTime() &&
      dateNumber.getTime() <= shiftEndDate.getTime();

    const isWithinShiftHoursOnStartDate =
      currentHour >= shiftStartDate.getHours() &&
      dateNumber.toDateString() === shiftStartDate.toDateString();

    const isWithinShiftHoursOnEndDate =
      currentHour < shiftEndDate.getHours() &&
      dateNumber.toDateString() === shiftEndDate.toDateString();

    return (
      isSameDayOrBeforeEndDate ||
      isWithinShiftHoursOnStartDate ||
      isWithinShiftHoursOnEndDate
    );
  };
}

export function shiftIsWithinDay(
  dateNumber: Date
): (value: StaffShift, index: number, array: StaffShift[]) => unknown {
  return (shift) => {
    const shiftStartDate = parseISO(shift.startTime);
    const shiftEndDate = parseISO(shift.endTime);

    const isWithinShiftDaysOnStartDate =
      dateNumber.getTime() >= shiftStartDate.getTime();

    const isWithinShiftDaysOnEndDate =
      dateNumber.getTime() <= shiftEndDate.getTime();

    return isWithinShiftDaysOnStartDate && isWithinShiftDaysOnEndDate;
  };
}

export function isShiftDay(dateNumber: Date, shifts: StaffShift[]) {
  return shifts.some((shift) => {
    const shiftDate = parseISO(shift.startTime);
    return (
      shiftDate.getFullYear() === dateNumber.getFullYear() &&
      shiftDate.getMonth() === dateNumber.getMonth() &&
      shiftDate.getDate() === dateNumber.getDate()
    );
  });
}
