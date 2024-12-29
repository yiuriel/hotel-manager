import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ShiftRequest } from "./shift.types";

export const shiftApi = createApi({
  reducerPath: "shiftApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/hotel`,
  }),
  endpoints: (builder) => ({
    addShift: builder.mutation<
      { message: string; ok: boolean; shiftCount: number; userId: string },
      { hotelId: string; shift: ShiftRequest }
    >({
      query: ({ hotelId, shift }) => ({
        url: `/${hotelId}/shift`,
        method: "POST",
        body: shift,
      }),
    }),
  }),
});

export const { useAddShiftMutation } = shiftApi;
