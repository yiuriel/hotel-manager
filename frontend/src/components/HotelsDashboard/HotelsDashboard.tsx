import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetHotelsQuery } from "../../redux/hotel/hotel.api";
import { Card } from "../Card/Card";
import { Loading } from "../Loading/Loading";
import { HotelsDashboardMenuItem } from "./HotelsDashboardMenuItem";

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
            <HotelsDashboardMenuItem
              key={hotel.id}
              hotel={hotel}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p>No hotels found</p>
      )}
    </Card>
  );
};
