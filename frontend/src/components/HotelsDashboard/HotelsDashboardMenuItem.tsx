import { FC } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { useAddHotelStaffMutation } from "../../redux/hotel/hotel.api";
import { Hotel } from "../../redux/hotel/hotel.types";
import { MenuItem } from "../Menu/MenuItem";

export const HotelsDashboardMenuItem: FC<{ hotel: Hotel; index: number }> = ({
  hotel,
  index,
}) => {
  const navigate = useNavigate();
  const [addHotelStaff] = useAddHotelStaffMutation();

  const organizationId = useAppSelector((state) => state.organization.id);

  const [collectedProps, drop] = useDrop<
    { id: string },
    void,
    { isOver: boolean }
  >(() => ({
    accept: ["user"],
    drop: (item) => {
      if (!item.id || !organizationId) {
        return;
      }
      if (hotel.id) {
        addHotelStaff({
          organizationId,
          userId: item.id,
          hotelId: hotel.id,
        });
      }
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
  }));

  return (
    <MenuItem
      key={`${index}-${hotel.id}`}
      onClick={() => navigate(`/app/hotel/${hotel.id}`)}
      className={`px-4 py-2 border-b border-purple-500 last-of-type:border-b-0 flex flex-col ${
        collectedProps.isOver ? "bg-yellow-100" : ""
      }`}
      ref={drop}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <span className="font-medium text-sm">{hotel.name}</span>
          <span className="text-xs text-gray-500 block">
            {hotel.address}, {hotel.city}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-1">
            {hotel.staffCount > 0 ? hotel.staffCount : "No"}
          </span>
          <span className="mr-1">Staff</span>
          {hotel.staffCount > 0 && (
            <span className="text-gray-500">
              {hotel.staff.map((staff) => staff.name).join(", ")}
            </span>
          )}
        </div>
      </div>
    </MenuItem>
  );
};
