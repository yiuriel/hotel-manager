import dayjs from "dayjs";
import { WeekView } from "./components/WeekView";

export const Calendar = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center text-lg font-bold">
        {dayjs().format("MMMM YYYY")}
      </div>
      <WeekView />
    </div>
  );
};
