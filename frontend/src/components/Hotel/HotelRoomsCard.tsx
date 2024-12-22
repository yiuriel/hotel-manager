import { useAppSelector } from "../../redux/hooks";
import { Button } from "../Button/Button";

export const HotelRoomsCard = () => {
  const hotel = useAppSelector((state) => state.hotel.currentHotel);

  if (!hotel) {
    return null;
  }

  return (
    <div className="bg-white rounded-sm shadow-md">
      <h2 className="text-2xl mb-2 flex justify-between p-4">
        Rooms <Button size="sm">add room</Button>
      </h2>
      <ul className="flex flex-col">
        {hotel.rooms.map((room) => {
          const price = room?.pricePerNight;

          return (
            <li
              key={room.id}
              className="flex justify-between p-2 border-t hover:bg-purple-100 cursor-pointer"
            >
              {room.roomNumber} - {room.roomType}{" "}
              <div>
                capacity: ({room.capacity}{" "}
                {room.capacity > 1 ? "people" : "person"})
              </div>
              <div className="flex  items-center">
                <Button
                  color="secondary"
                  className="px-1 py-1 h-6 w-6"
                  onClick={() => console.log("change price")}
                >
                  -
                </Button>
                <span className="mx-2">${price}</span>
                <Button
                  color="secondary"
                  className="px-1 py-1 h-6 w-6"
                  onClick={() => console.log("change price")}
                >
                  +
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
