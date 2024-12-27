import { FC } from "react";
import {
  useGetRoomsQuery,
  useDeleteRoomMutation,
} from "../../redux/room/room.api";
import { Loading } from "../Loading/Loading";
import { Button } from "../Button/Button";

export const HotelRomms: FC<{
  hotelId: string;
}> = ({ hotelId }) => {
  const { data } = useGetRoomsQuery(hotelId);
  const [deleteRoom] = useDeleteRoomMutation();

  if (data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-semibold">{room.roomNumber}</h2>
            <p>
              {room.roomType} - capacity: {room.capacity}{" "}
              {room.capacity > 1 ? "people" : "person"}
            </p>
            <p>Price per night: ${room.pricePerNight}</p>
            <div className="mt-4">
              <Button
                className="mr-2"
                onClick={() => deleteRoom({ hotelId, roomId: room.id })}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <Loading />;
};
