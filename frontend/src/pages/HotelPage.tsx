import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { useLazyGetHotelByIdQuery } from "../redux/hotel/hotel.api";
import { Loading } from "../components/Loading/Loading";
import { Hotel } from "../components/Hotel/Hotel";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ForbiddenContent } from "../components/ForbiddenContent/ForbiddenContent";

export const HotelPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const organizationId = useAppSelector((state) => state.organization.id);
  const [fetchHotel, { data, isLoading, isUninitialized, error, isError }] =
    useLazyGetHotelByIdQuery();

  useEffect(() => {
    if (organizationId && hotelId) {
      fetchHotel({ organizationId, hotelId });
    }
  }, [fetchHotel, hotelId, organizationId]);

  if (isUninitialized || isLoading) {
    return <Loading />;
  }

  if (isError && (error as FetchBaseQueryError)?.status === 403) {
    return <ForbiddenContent />;
  }

  return data ? <Hotel hotel={data} /> : <div>Hotel not found</div>;
};
