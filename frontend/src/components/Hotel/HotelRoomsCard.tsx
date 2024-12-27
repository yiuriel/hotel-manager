import { useAppSelector } from "../../redux/hooks";
import { Button } from "../Button/Button";
import { RoomListItem } from "../RoomListItem/RoomListItem";

export const HotelRoomsCard = () => {
  const hotel = useAppSelector((state) => state.hotel.currentHotel);

  if (!hotel) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Rooms</h2>
        <Button size="sm" variant="contained">
          Add Room
        </Button>
      </div>
      <div className="divide-y divide-gray-200">
        {hotel.rooms.map((room) => (
          <div key={room.id} className="hover:bg-gray-50">
            <RoomListItem room={room} hotelId={hotel.id} />
          </div>
        ))}
      </div>
      <div className="px-6 py-4">
        <Button size="sm" variant="outlined" fullWidth>
          View All Rooms
        </Button>
      </div>
    </div>
  );
};
