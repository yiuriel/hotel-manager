import { FC } from "react";
import { useAppSelector } from "../../redux/hooks";
import { HotelStaffWithShifts } from "../../redux/hotel/hotel.types";
import { StaffAddShift } from "../Staff/StaffAddShift";

export const HotelStaffCard: FC<{
  staffMember: HotelStaffWithShifts;
  onStaffMemberClick: (staffMemberId: string) => void;
}> = ({ staffMember, onStaffMemberClick }) => {
  const selectedStaffMember = useAppSelector(
    (state) => state.hotel.selectedStaffMember
  );

  const isSelected = selectedStaffMember === staffMember.id;

  return (
    <div
      className={`
        relative flex flex-col rounded-lg border transition-all duration-150 cursor-pointer
        ${
          isSelected
            ? "border-yellow-400 bg-yellow-50 shadow-md"
            : "border-gray-200 hover:border-yellow-400 hover:shadow-sm"
        }
      `}
      onClick={() => onStaffMemberClick(staffMember.id)}
    >
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {staffMember.name}
          </h3>
          <div>
            <StaffAddShift staffMember={staffMember} />
          </div>
        </div>
        <div className="text-sm text-gray-600 truncate">
          {staffMember.email}
        </div>
      </div>
    </div>
  );
};
