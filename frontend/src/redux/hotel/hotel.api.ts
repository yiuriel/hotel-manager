import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HotelResponse, ManyHotelResponse } from "./hotel.types";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/organization" }),
  endpoints: (builder) => ({
    getHotels: builder.query<ManyHotelResponse, string>({
      query: (organizationId) => ({
        url: `/${organizationId}/hotel`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getHotelById: builder.query<
      HotelResponse,
      { organizationId: string; hotelId: string }
    >({
      query: ({ organizationId, hotelId }) => ({
        url: `/${organizationId}/hotel/${hotelId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLazyGetHotelsQuery,
  useGetHotelsQuery,
  useLazyGetHotelByIdQuery,
} = hotelApi;
