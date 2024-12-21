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
    <div className="bg-white rounded-sm shadow p-4">
      <h1 className="text-3xl">{hotel.name}</h1>
      <div className="flex flex-col">
        <div>
          <span className="font-bold">Address:</span> {hotel.address}
        </div>
        <div>
          <span className="font-bold">City:</span> {hotel.city}
        </div>
        <div>
          <span className="font-bold">State:</span> {hotel.state}
        </div>
        <div>
          <span className="font-bold">Country:</span> {hotel.country}
        </div>
        <div>
          <span className="font-bold">Phone:</span> {hotel.phone}
        </div>
        <div>
          <span className="font-bold">Email:</span> {hotel.email}
        </div>
        <div>
          <span className="font-bold">People working in hotel:</span>{" "}
          {hotel.staffCount}
        </div>
      </div>
      <h2 className="text-2xl">Staff</h2>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {hotel.staff.map((staffMember) => (
          <HotelStaffCard
            key={staffMember.id}
            staffMember={staffMember}
            onStaffMemberClick={onStaffMemberClick}
          />
        ))}
      </ul>
    </div>
  );
};
