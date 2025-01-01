import { useAppSelector } from "../../redux/hooks";

export const HotelInfoCard = () => {
  const hotel = useAppSelector((state) => state.hotel.currentHotel);

  if (!hotel) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md px-6 py-3">
      <h1 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
      <dl className="grid grid-cols-2 gap-x-2 gap-y-1">
        <div className="flex items-center text-sm">
          <dt className="text-gray-500">Address: </dt>
          <dd className="text-gray-900 ml-2">{hotel.address}</dd>
        </div>
        <div className="flex items-center text-sm">
          <dt className="text-gray-500">City: </dt>
          <dd className="text-gray-900 ml-2">{hotel.city}</dd>
        </div>
        <div className="flex items-center text-sm">
          <dt className="text-gray-500">State: </dt>
          <dd className="text-gray-900 ml-2">{hotel.state}</dd>
        </div>
        <div className="flex items-center text-sm">
          <dt className="text-gray-500">Country: </dt>
          <dd className="text-gray-900 ml-2">{hotel.country}</dd>
        </div>
        <div className="flex items-center text-sm">
          <dt className="text-gray-500">Phone: </dt>
          <dd className="text-gray-900 ml-2">{hotel.phone}</dd>
        </div>
        <div className="flex items-center text-sm">
          <dt className="text-gray-500">Email: </dt>
          <dd className="text-gray-900 ml-2">{hotel.email}</dd>
        </div>
        <div className="flex items-center text-sm">
          <dt className="text-gray-500">Staff: </dt>
          <dd className="text-gray-900 ml-2">{hotel.staffCount} people</dd>
        </div>
      </dl>
    </div>
  );
};
