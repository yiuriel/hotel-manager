import { FC, useEffect, useState } from "react";
import { Room } from "../../redux/room/room.types";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useAppDispatch } from "../../redux/hooks";
import { hotelApi, HOTEL_TAG } from "../../redux/hotel/hotel.api";
import { useUpdateRoomMutation } from "../../redux/room/room.api";

export const RoomListItem: FC<{ room: Room; hotelId: string }> = ({
  room,
  hotelId,
}) => {
  const dispatch = useAppDispatch();
  const [updateRoom] = useUpdateRoomMutation();

  const [roomPrice, setRoomPrice] = useState(room.pricePerNight);

  const updateRoomPrice = async (roomId: string, price: number) => {
    await updateRoom({
      hotelId,
      roomId,
      room: { pricePerNight: String(price.toFixed(2)) },
    });

    dispatch(hotelApi.util.invalidateTags([HOTEL_TAG]));
  };

  useEffect(() => {
    setRoomPrice(room.pricePerNight);
  }, [room.pricePerNight]);

  return (
    <li
      key={room.id}
      className="flex justify-between p-2 border-t hover:bg-purple-100 cursor-pointer"
    >
      {room.roomNumber} - {room.roomType}{" "}
      <div>
        capacity: ({room.capacity} {room.capacity > 1 ? "people" : "person"})
      </div>
      <div className="flex  items-center">
        <Button
          color="secondary"
          className="px-1 py-1 h-6 w-6"
          onClick={() =>
            updateRoomPrice(room.id, parseFloat(room.pricePerNight) * 0.9)
          }
        >
          -
        </Button>
        <Input
          type="text"
          className="w-16 mx-2"
          value={roomPrice}
          onChange={(e) => setRoomPrice(e.target.value)}
          onBlur={(e) => {
            const newPrice = parseFloat(roomPrice);
            if (!isNaN(newPrice) && newPrice > 0) {
              updateRoomPrice(room.id, newPrice);
            } else {
              e.target.value = room.pricePerNight;
            }
          }}
        />
        <Button
          color="secondary"
          className="px-1 py-1 h-6 w-6"
          onClick={() =>
            updateRoomPrice(room.id, parseFloat(room.pricePerNight) * 1.1)
          }
        >
          +
        </Button>
      </div>
    </li>
  );
};
