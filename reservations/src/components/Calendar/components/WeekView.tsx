import dayjs from "dayjs";
import { TruncatedText } from "../../TruncatedText/TruncatedText";

// Mock reservations data
const reservations = [
  { date: dayjs().day(1).hour(8), title: "Check-in" },
  { date: dayjs().day(1).hour(12), title: "Check-out" },
  { date: dayjs().day(1).hour(14), title: "Event 1" },
  { date: dayjs().day(1).hour(14), title: "Event 1" },
  { date: dayjs().day(1).hour(14), title: "Event 1" },
  { date: dayjs().day(1).hour(14), title: "Event 1" },
  { date: dayjs().day(1).hour(14), title: "Event 1" },
  { date: dayjs().day(1).hour(14), title: "Event 1" },
  { date: dayjs().day(1).hour(14), title: "Event 1" },
  { date: dayjs().day(1).hour(16), title: "Meeting" },
  { date: dayjs().day(2).hour(10), title: "Event 2" },
  { date: dayjs().day(2).hour(14), title: "Check-in" },
  { date: dayjs().day(2).hour(16), title: "Check-out" },
  { date: dayjs().day(2).hour(18), title: "Event 3" },
  { date: dayjs().day(3).hour(9), title: "Event 4" },
  { date: dayjs().day(3).hour(11), title: "Meeting" },
  { date: dayjs().day(3).hour(13), title: "Event 5" },
  { date: dayjs().day(3).hour(15), title: "Check-in" },
  { date: dayjs().day(3).hour(17), title: "Check-out" },
  { date: dayjs().day(4).hour(9), title: "Event 6" },
  { date: dayjs().day(4).hour(11), title: "Meeting" },
  { date: dayjs().day(4).hour(13), title: "Event 7" },
  { date: dayjs().day(4).hour(15), title: "Check-in" },
  { date: dayjs().day(4).hour(17), title: "Check-out" },
  { date: dayjs().day(4).hour(19), title: "Event 8" },
  { date: dayjs().day(4).hour(21), title: "Meeting" },
  { date: dayjs().day(4).hour(23), title: "Event 9" },
  { date: dayjs().day(4).hour(1), title: "Check-in" },
  { date: dayjs().day(4).hour(3), title: "Event 10" },
  { date: dayjs().day(4).hour(5), title: "Check-out" },
  { date: dayjs().day(4).hour(7), title: "Event 11" },
  { date: dayjs().day(4).hour(9), title: "Meeting" },
  { date: dayjs().day(4).hour(11), title: "Event 12" },
  { date: dayjs().day(4).hour(11), title: "Event 12" },
  { date: dayjs().day(4).hour(11), title: "Event 12" },
  { date: dayjs().day(4).hour(11), title: "Event 12" },
  { date: dayjs().day(4).hour(11), title: "Event 12" },
];

const getOrdinalNumeral = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const WeekView = () => {
  const currentDate = dayjs();
  const startOfWeek = currentDate.day(0).date();

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = currentDate.date(startOfWeek + i).date();
    return {
      dayString: `${currentDate
        .date(startOfWeek + i)
        .format("dddd")} ${getOrdinalNumeral(date)}`,
      date: currentDate.date(startOfWeek + i),
    };
  });

  return (
    <div className="flex justify-between">
      {days.map(({ dayString, date }, dayIndex) => (
        <div
          key={dayString}
          className="flex flex-col flex-1 border-r-2 border-blue-500 last:border-r-0"
        >
          <TruncatedText
            className="px-1 border-b-2 border-blue-500"
            key={dayIndex}
          >
            {dayString}
          </TruncatedText>
          {Array.from({ length: 24 }, (_, hour) => {
            const reservationsInHour = reservations.filter((reservation) =>
              reservation.date.isSame(date.hour(hour), "hour")
            );
            const reservationCount = reservationsInHour.length;
            const hasReservation = reservationCount > 0;
            const hasMultipleReservations = reservationCount >= 2;
            const hasManyReservations = reservationCount >= 5;
            return (
              <div
                key={hour}
                className={`flex items-center h-10 px-2 ${
                  hasReservation ? "bg-yellow-200" : ""
                } ${hasMultipleReservations ? "bg-red-200" : ""} ${
                  hasManyReservations ? "bg-blue-200" : ""
                } border-b-2 border-blue-500 last:border-b-0 hover:bg-blue-100 hover:bg-opacity-80`}
              >
                <small className={`text-right`}>{`${
                  hour < 10 ? "0" : ""
                }${hour}:00`}</small>
                {hasMultipleReservations && (
                  <span className=" flex-1 ml-2 text-sm text-gray-700 truncate">
                    {hasManyReservations
                      ? `5+ reservations`
                      : `2+ reservations`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
