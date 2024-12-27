import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { Button } from "../Button/Button";
import { RoomListItem } from "../RoomListItem/RoomListItem";
import { CreateRoomDialog } from "../HotelRooms/CreateRoomDialog";
import { useState } from "react";

export const HotelRoomsCard = () => {
  const navigate = useNavigate();
  const hotel = useAppSelector((state) => state.hotel.currentHotel);
  const [open, setOpen] = useState(false);

  if (!hotel) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Rooms</h2>
        <Button size="sm" variant="contained" onClick={() => setOpen(true)}>
          Add Room
        </Button>
        {open && (
          <CreateRoomDialog
            open={open}
            onClose={() => setOpen(false)}
            hotelId={hotel.id}
          />
        )}
      </div>
      <div className="divide-y divide-gray-200">
        {hotel.rooms.map((room) => (
          <div key={room.id} className="hover:bg-gray-50">
            <RoomListItem room={room} hotelId={hotel.id} />
          </div>
        ))}
      </div>
      <div className="px-6 py-4">
        <Button
          size="sm"
          variant="outlined"
          fullWidth
          onClick={() => {
            navigate(`/app/hotel/${hotel.id}/room`);
          }}
        >
          View All Rooms
        </Button>
      </div>
    </div>
  );
};
