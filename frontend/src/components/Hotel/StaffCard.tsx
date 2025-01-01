import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useAddHotelStaffMutation } from "../../redux/hotel/hotel.api";
import { setSelectedStaffMember } from "../../redux/hotel/hotel.slice";
import { AddUserForm } from "../AddUserForm/AddUserForm";
import { Button } from "../Button/Button";
import { HotelStaffCard } from "./HotelStaffCard";

export const StaffCard = () => {
  const dispatch = useAppDispatch();
  const [addHotelStaff] = useAddHotelStaffMutation();

  const hotel = useAppSelector((state) => state.hotel.currentHotel);
  const organizationId = useAppSelector((state) => state.organization.id);
  const [open, setOpen] = useState(false);

  const onStaffMemberClick = (staffMemberId: string) => {
    dispatch(setSelectedStaffMember(staffMemberId));
  };

  if (!hotel) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Staff Members</h2>
        <Button
          size="sm"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Staff
        </Button>
        {open && (
          <AddUserForm
            onClose={() => setOpen(false)}
            onSuccess={async (userId) => {
              if (!hotel.id || !organizationId) {
                return;
              }

              await addHotelStaff({
                hotelId: hotel.id,
                userId,
                organizationId,
              });
              onStaffMemberClick(userId);
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {hotel.staff.map((staffMember) => (
          <HotelStaffCard
            key={staffMember.id}
            staffMember={staffMember}
            onStaffMemberClick={onStaffMemberClick}
          />
        ))}
      </div>
    </div>
  );
};
