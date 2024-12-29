import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetHotelsQuery } from "../../redux/hotel/hotel.api";
import { Card } from "../Card/Card";
import { Loading } from "../Loading/Loading";
import { HotelsDashboardMenuItem } from "./HotelsDashboardMenuItem";
import { AddHotelFormDialog } from "../AddHotelFormDialog/AddHotelFormDialog";

export const HotelsDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const organizationId = useAppSelector((state) => state.organization.id);
  const [fetchHotels, { data = [], isLoading, error, isUninitialized }] =
    useLazyGetHotelsQuery();

  useEffect(() => {
    if (organizationId) {
      fetchHotels(organizationId);
    }
  }, [fetchHotels, organizationId]);

  if (error) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center p-6 text-red-600">
          <p className="text-lg font-medium">Oops! Something went wrong</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      </Card>
    );
  }

  const loading = isUninitialized || isLoading;

  return (
    <>
      <Card
        actions={[
          {
            label: "Add new Hotel",
            action: () => {
              setOpen(true);
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
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loading />
            </div>
          ) : data && data.length > 0 ? (
            <div>
              {data.map((hotel, index) => (
                <HotelsDashboardMenuItem
                  key={hotel.id}
                  hotel={hotel}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-gray-500">
              <p className="text-lg font-medium">No hotels found</p>
              <p className="text-sm mt-2">
                Add your first hotel to get started
              </p>
            </div>
          )}
        </div>
      </Card>
      <AddHotelFormDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};
