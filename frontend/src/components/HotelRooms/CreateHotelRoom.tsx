import { FC, useState } from "react";
import { Button } from "../Button/Button";
import { CreateRoomDialog } from "./CreateRoomDialog";

export const CreateHotelRoom: FC<{
  hotelId: string;
}> = ({ hotelId }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Create new room
      </Button>
      {open && (
        <CreateRoomDialog
          open={open}
          onClose={() => setOpen(false)}
          hotelId={hotelId}
        />
      )}
    </>
  );
};
