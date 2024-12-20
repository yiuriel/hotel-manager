import { HotelsDashboard } from "../components/HotelsDashboard/HotelsDashboard";

export const Dashboard = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <HotelsDashboard />
    </div>
  );
};
