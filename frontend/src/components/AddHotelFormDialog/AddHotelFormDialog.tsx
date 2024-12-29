import { FC } from "react";
import { Dialog } from "../Dialog/Dialog";
import { NewHotelForm } from "../NewHotel/NewHotelForm";

export const AddHotelFormDialog: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Dialog
      title="Add new hotel"
      open={open}
      onClose={onClose}
      className="w-96"
    >
      <NewHotelForm onSubmit={onClose} onCancel={onClose} />
    </Dialog>
  );
};
