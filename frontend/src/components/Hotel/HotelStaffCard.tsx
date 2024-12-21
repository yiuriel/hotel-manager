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

  return (
    <li
      key={staffMember.id}
      className={`flex flex-col border border-gray-300 rounded-sm cursor-pointer p-2 ${
        selectedStaffMember === staffMember.id ? "bg-yellow-400" : ""
      }`}
      onClick={() => onStaffMemberClick(staffMember.id)}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{staffMember.name}</span>
        <StaffAddShift staffMember={staffMember} />
      </div>
      <span className={`px-2 py-1 cursor-pointer truncate`}>
        {staffMember.email}
      </span>
    </li>
  );
};
