import { useAppSelector } from "../../redux/hooks";
import { Button } from "../Button/Button";
import { RoomListItem } from "../RoomListItem/RoomListItem";

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
        {hotel.rooms.map((room) => (
          <RoomListItem key={room.id} room={room} hotelId={hotel.id} />
        ))}
      </ul>
    </div>
  );
};
