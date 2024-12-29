import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { HOTEL_TAG, hotelApi } from "../../redux/hotel/hotel.api";
import { HotelStaffWithShifts } from "../../redux/hotel/hotel.types";
import { useAddShiftMutation } from "../../redux/shift/shift.api";
import { USER_SHIFT_TAG, userApi } from "../../redux/user/user.api";
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

  const [startTime, setStartTime] = useState(todayISOString);
  const [endTime, setEndTime] = useState(
    new Date(new Date(startTime).getTime() + 8 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );
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
          dispatch(userApi.util.invalidateTags([USER_SHIFT_TAG]));
        }
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    const newEndTime = new Date(
      new Date(newStartTime).getTime() + 8 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 16);
    setStartTime(newStartTime);
    setEndTime(newEndTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    if (new Date(newEndTime).getTime() < new Date(startTime).getTime()) {
      return;
    }
    setEndTime(newEndTime);
  };

  return (
    <>
      <Button
        size="sm"
        variant="contained"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(true);
        }}
      >
        Add Shift
      </Button>
      <Dialog
        open={open}
        title={`Add Shift for ${staffMember.name}`}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="startTime"
              >
                Start Time
              </label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={handleStartTimeChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="endTime"
              >
                End Time
              </label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={handleEndTimeChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="notes"
              >
                Notes
              </label>
              <textarea
                id="notes"
                placeholder="Add shift notes..."
                autoComplete="off"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button size="sm" variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="contained"
              disabled={!isFormValid}
              onClick={submitNewShift}
            >
              Add Shift
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
