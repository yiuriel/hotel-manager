import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetHotelsQuery } from "../../redux/hotel/hotel.api";
import { Loading } from "../Loading/Loading";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router";
import { PlusCircleIcon } from "../Icons/PlusCircleIcon"; // Import PlusCircleIcon
import { HoverableIcon } from "../Icons/HoverableIcon";

export const HotelGrid = () => {
  const navigate = useNavigate();
  const organizationId = useAppSelector((state) => state.organization.id);
  const [fetchHotels, { data = [], isLoading, error, isUninitialized }] =
    useLazyGetHotelsQuery();

  useEffect(() => {
    if (organizationId) {
      fetchHotels(organizationId);
    }
  }, [fetchHotels, organizationId]);

  if (error) {
    return <p>Error: there was an error, please try again later!</p>;
  }

  if (isLoading || isUninitialized) {
    return <Loading size="lg" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-purple-600 mb-4 text-center">{hotel.name}</h3>
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-gray-600 font-medium">Rooms</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-800">{hotel.roomCount}</span>
                  <HoverableIcon
                    onClick={() => {
                      console.log("add room");
                    }}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    <PlusCircleIcon />
                  </HoverableIcon>
                </div>
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="text-gray-600 font-medium">Staff</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-800">{hotel.staffCount}</span>
                  <HoverableIcon
                    onClick={() => {
                      console.log("add staff");
                    }}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    <PlusCircleIcon />
                  </HoverableIcon>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => {
                navigate(`/app/hotel/${hotel.id}/edit`);
              }}
              fullWidth
              className="py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors duration-200"
            >
              Edit Hotel
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
