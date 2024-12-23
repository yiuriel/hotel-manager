import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateHotelDto,
  HotelResponse,
  ManyHotelResponse,
} from "./hotel.types";

export const HOTELS_TAG = "HOTELS";
export const HOTEL_TAG = "HOTEL";
export const ALL_HOTEL_TAGS = [HOTELS_TAG, HOTEL_TAG];

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/organization`,
  }),
  tagTypes: ALL_HOTEL_TAGS,
  endpoints: (builder) => ({
    getHotels: builder.query<ManyHotelResponse, string>({
      query: (organizationId) => ({
        url: `/${organizationId}/hotel`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [HOTELS_TAG],
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
      providesTags: [HOTEL_TAG],
    }),
    addNewHotel: builder.mutation<
      { message: string; ok: boolean },
      { organizationId: string; hotel: CreateHotelDto }
    >({
      query: ({ organizationId, hotel }) => ({
        url: `/${organizationId}/hotel`,
        method: "POST",
        body: hotel,
        credentials: "include",
      }),
      invalidatesTags: [HOTELS_TAG],
    }),
  }),
});

export const {
  useLazyGetHotelsQuery,
  useGetHotelsQuery,
  useLazyGetHotelByIdQuery,
  useAddNewHotelMutation,
} = hotelApi;
