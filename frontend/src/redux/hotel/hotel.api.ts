import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HotelResponse } from "./hotel.types";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/organization" }),
  endpoints: (builder) => ({
    getHotels: builder.query<HotelResponse, string>({
      query: (organizationId) => ({
        url: `/${organizationId}/hotel`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLazyGetHotelsQuery, useGetHotelsQuery } = hotelApi;
