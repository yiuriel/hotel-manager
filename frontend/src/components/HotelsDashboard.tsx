import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useLazyGetHotelsQuery } from "../redux/hotel/hotel.api";
import { Card } from "./Card/Card";
import { useNavigate } from "react-router";
import { MenuItem } from "./Menu/MenuItem";
import { Loading } from "./Loading/Loading";

export const HotelsDashboard = () => {
  const navigate = useNavigate();
  const organizationId = useAppSelector((state) => state.organization.id);
  const [fetchHotels, { data = [], isLoading, error, isUninitialized }] =
    useLazyGetHotelsQuery();

  useEffect(() => {
    if (organizationId) {
      fetchHotels(organizationId);
    }
  }, [fetchHotels, organizationId]);

  if (error) {
    return <p>Error: there was an error, please try again later!</p>;
  }

  const loading = isUninitialized || isLoading;

  return (
    <Card
      actions={[
        {
          label: "Add new Hotel",
          action: () => {
            navigate("/app/hotel/new");
          },
        },
        {
          label: "View Hotels",
          action: () => {
            navigate("/app/hotel");
          },
        },
      ]}
    >
      {loading ? (
        <Loading />
      ) : data && data.length > 0 ? (
        <div key="hotel-dashboard">
          {data.map((hotel, index) => (
            <MenuItem
              key={`${index}-${hotel.id}`}
              onClick={() => navigate(`/app/hotel/${hotel.id}`)}
              className="px-4 py-2 border-b-2 border-purple-200 last-of-type:border-b-0"
            >
              {hotel.name}
              <br />
              <span className="text-sm text-gray-500">
                {hotel.address}, {hotel.city}, {hotel.country}
              </span>
            </MenuItem>
          ))}
        </div>
      ) : (
        <p>No hotels found</p>
      )}
    </Card>
  );
};
