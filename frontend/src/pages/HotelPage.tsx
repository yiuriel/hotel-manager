import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { useLazyGetHotelByIdQuery } from "../redux/hotel/hotel.api";
import { Loading } from "../components/Loading/Loading";

export const HotelPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const organizationId = useAppSelector((state) => state.organization.id);
  const [fetchHotel, { data, isLoading, isUninitialized }] =
    useLazyGetHotelByIdQuery();

  useEffect(() => {
    if (organizationId && hotelId) {
      fetchHotel({ organizationId, hotelId });
    }
  }, [fetchHotel, hotelId, organizationId]);

  if (isUninitialized || isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 p-4 mt-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold text-purple-700">{data?.name}</h1>
      <div className="space-y-4">
        <p className="text-gray-700">
          <span className="font-semibold">Address:</span> {data?.address},{" "}
          {data?.city}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {data?.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {data?.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Staff Count:</span> {data?.staffCount}
        </p>
      </div>
      <h2 className="text-2xl font-semibold text-purple-700">Staff</h2>
      <ul className="space-y-2">
        {data?.staff.map((staff) => (
          <li key={staff.id} className="text-gray-600">
            {staff.name} ({staff.email})
            <ul className="space-y-2 pl-4">
              {staff.shifts.map((shift) => (
                <li key={shift.id} className="text-gray-600">
                  <span className="font-semibold">Start:</span>{" "}
                  {new Date(shift.startTime).toLocaleString()} -{" "}
                  <span className="font-semibold">End:</span>{" "}
                  {new Date(shift.endTime).toLocaleString()}
                  {shift.notes && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Notes:</span>{" "}
                      {shift.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
