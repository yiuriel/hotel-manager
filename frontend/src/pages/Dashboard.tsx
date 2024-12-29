import { HotelsDashboard } from "../components/HotelsDashboard/HotelsDashboard";
import { OrganizationUsersDashboard } from "../components/OrganizationUsersDashboard/OrganizationUsersDashboard";

export const Dashboard = () => {
  return (
    <div className="flex-1">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px]">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <HotelsDashboard />
          <OrganizationUsersDashboard />
        </div>
      </div>
    </div>
  );
};
