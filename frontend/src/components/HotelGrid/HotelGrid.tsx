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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((hotel) => (
        <div
          key={hotel.id}
          className="text-3xl shadow-md hover:shadow-xl rounded-md flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="text-purple-600 mb-4">{hotel.name}</div>
          <div className="flex text-base justify-around border-t w-full p-2">
            <span className="flex gap-2 items-center">
              rooms: {hotel.roomCount}{" "}
              <HoverableIcon
                onClick={() => {
                  console.log("add room");
                }}
              >
                <PlusCircleIcon />
              </HoverableIcon>
            </span>
            <span className="flex gap-2 items-center">
              staff: {hotel.staffCount}{" "}
              <HoverableIcon
                onClick={() => {
                  console.log("add staff");
                }}
              >
                <PlusCircleIcon />
              </HoverableIcon>
            </span>
          </div>
          <div className="flex justify-center w-full">
            <Button
              onClick={() => {
                navigate(`/app/hotel/${hotel.id}/edit`);
              }}
              fullWidth
              className="rounded-none"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
