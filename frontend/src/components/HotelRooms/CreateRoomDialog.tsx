import { faker } from "@faker-js/faker";
import { FC, useState } from "react";
import { useAddRoomMutation } from "../../redux/room/room.api";
import { Button } from "../Button/Button";
import { Dialog } from "../Dialog/Dialog";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import { useAppDispatch } from "../../redux/hooks";
import { HOTEL_TAG, hotelApi } from "../../redux/hotel/hotel.api";

export const CreateRoomDialog: FC<{
  open: boolean;
  onClose: () => void;
  hotelId: string;
}> = ({ open, onClose, hotelId }) => {
  const dispatch = useAppDispatch();
  const [roomNumber, setRoomNumber] = useState(
    `${faker.lorem.word({
      length: {
        min: 1,
        max: 10,
      },
    })}-${faker.number.int({ min: 101, max: 999 })}`
  );
  const [roomType, setRoomType] = useState(faker.lorem.word());
  const [capacity, setCapacity] = useState(
    faker.number.int({ min: 1, max: 10 })
  );
  const [pricePerNight, setPricePerNight] = useState(
    faker.number.float({ min: 10, max: 500, fractionDigits: 2 })
  );
  const [description, setDescription] = useState(
    faker.lorem.sentence({
      min: 2,
      max: 5,
    })
  );
  const [isAvailable, setIsAvailable] = useState(false);
  const [addRoom] = useAddRoomMutation();

  const canSubmit = Boolean(
    roomNumber && roomType && capacity > 0 && pricePerNight > 0 && description
  );

  return (
    <Dialog title="Create new room" open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Label>
          <span>Room number</span>
          <Input
            type="text"
            placeholder="Room number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            fullWidth
          />
        </Label>
        <Label>
          <span>Room type</span>
          <Input
            type="text"
            placeholder="Room type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            fullWidth
          />
        </Label>
        <Label>
          <span>Capacity</span>
          <Input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Label>
        <Label>
          <span>Price per night</span>
          <Input
            type="number"
            placeholder="Price per night"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Label>
        <Label>
          <span>Description</span>
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Label>
        <Label className="flex items-center gap-2 flex-nowrap">
          <span className="truncate">Is available</span>
          <Input
            type="checkbox"
            className="h-4 w-auto"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </Label>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            disabled={!canSubmit}
            onClick={async () => {
              await addRoom({
                hotelId,
                room: {
                  roomNumber,
                  roomType,
                  capacity,
                  pricePerNight: String(pricePerNight),
                  description,
                  isAvailable,
                },
              });

              dispatch(hotelApi.util.invalidateTags([HOTEL_TAG]));
              onClose();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
