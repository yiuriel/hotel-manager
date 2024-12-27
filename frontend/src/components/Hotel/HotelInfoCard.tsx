import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedStaffMember } from "../../redux/hotel/hotel.slice";
import { HotelStaffCard } from "./HotelStaffCard";

export const HotelInfoCard = () => {
  const dispatch = useAppDispatch();
  const hotel = useAppSelector((state) => state.hotel.currentHotel);

  const onStaffMemberClick = (staffMemberId: string) => {
    dispatch(setSelectedStaffMember(staffMemberId));
  };

  if (!hotel) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{hotel.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-gray-500 w-20">Address:</span>
              <span className="text-gray-900 flex-1">{hotel.address}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 w-20">City:</span>
              <span className="text-gray-900">{hotel.city}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 w-20">State:</span>
              <span className="text-gray-900">{hotel.state}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 w-20">Country:</span>
              <span className="text-gray-900">{hotel.country}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-gray-500 w-20">Phone:</span>
              <span className="text-gray-900">{hotel.phone}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 w-20">Email:</span>
              <span className="text-gray-900">{hotel.email}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 w-20">Staff:</span>
              <span className="text-gray-900">{hotel.staffCount} people</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Staff Members</h2>
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
    </div>
  );
};
