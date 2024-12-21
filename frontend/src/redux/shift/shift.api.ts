import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ShiftRequest } from "./shift.types";

export const shiftApi = createApi({
  reducerPath: "shiftApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/hotel" }),
  endpoints: (builder) => ({
    addShift: builder.mutation<
      { message: string },
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
