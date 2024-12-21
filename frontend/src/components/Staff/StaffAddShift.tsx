import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { HOTEL_TAG, hotelApi } from "../../redux/hotel/hotel.api";
import { HotelStaffWithShifts } from "../../redux/hotel/hotel.types";
import { useAddShiftMutation } from "../../redux/shift/shift.api";
import { Button } from "../Button/Button";
import { Dialog } from "../Dialog/Dialog";
import { Input } from "../Input/Input";

export const StaffAddShift: FC<{
  staffMember: HotelStaffWithShifts;
}> = ({ staffMember }) => {
  const dispatch = useAppDispatch();
  const [addShift] = useAddShiftMutation();

  const hotelId = useAppSelector((state) => state.hotel.currentHotel?.id);
  const [open, setOpen] = useState(false);

  const today = new Date();
  const todayISOString = today.toISOString().slice(0, 16);
  const oneHourLaterISOString = new Date(today.getTime() + 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  const [startTime, setStartTime] = useState(todayISOString);
  const [endTime, setEndTime] = useState(oneHourLaterISOString);
  const [notes, setNotes] = useState("");

  const isFormValid = !!startTime && !!endTime && !!notes;

  const submitNewShift = async () => {
    if (isFormValid && hotelId) {
      try {
        const response = await addShift({
          shift: { startTime, endTime, notes, staffId: staffMember.id },
          hotelId,
        });

        if (response.data?.message) {
          dispatch(hotelApi.util.invalidateTags([HOTEL_TAG]));
        }
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Button
        className="!bg-blue-500 hover:!bg-blue-600 text-white !py-1 !text-xs !px-2 rounded-sm"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(true);
        }}
      >
        Add Shifts
      </Button>
      <Dialog
        open={open}
        title={`Add Shift for ${staffMember.name}`}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <label className="w-1/3 text-sm" htmlFor="startTime">
              Start Time
            </label>
            <Input
              id="startTime"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border flex-1 border-gray-300 rounded-sm p-2"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <label className="w-1/3 text-sm" htmlFor="endTime">
              End Time
            </label>
            <Input
              id="endTime"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border flex-1 border-gray-300 rounded-sm p-2"
            />
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <label className="w-1/3 text-sm" htmlFor="notes">
              Notes
            </label>
            <Input
              id="notes"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border flex-1 border-gray-300 rounded-sm p-2 resize-y"
            />
          </div>
          <Button
            type="submit"
            color="submit"
            disabled={!isFormValid}
            onClick={submitNewShift}
          >
            Add Shift
          </Button>
        </div>
      </Dialog>
    </>
  );
};
