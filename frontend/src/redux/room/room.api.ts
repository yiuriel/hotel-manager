import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "./room.types";

const ROOM_TAG = "ROOM";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/hotel`,
  }),
  tagTypes: [ROOM_TAG],
  endpoints: (builder) => ({
    getRooms: builder.query<Room[], string>({
      query: (hotelId) => `/${hotelId}/room`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: ROOM_TAG, id } as const)),
              { type: ROOM_TAG, id: "LIST" },
            ]
          : [{ type: ROOM_TAG, id: "LIST" }],
    }),
    getRoomById: builder.query<Room, { hotelId: string; roomId: string }>({
      query: ({ hotelId, roomId }) => `/${hotelId}/room/${roomId}`,
      providesTags: (_, __, { roomId }) => [{ type: ROOM_TAG, id: roomId }],
    }),
    addRoom: builder.mutation<Room, { hotelId: string; room: Partial<Room> }>({
      query: ({ hotelId, room }) => ({
        url: `/${hotelId}/room`,
        method: "POST",
        body: room,
      }),
      invalidatesTags: [{ type: ROOM_TAG, id: "LIST" }],
    }),
    updateRoom: builder.mutation<
      void,
      { hotelId: string; roomId: string; room: Partial<Room> }
    >({
      query: ({ hotelId, roomId, room }) => ({
        url: `/${hotelId}/room/${roomId}`,
        method: "PATCH",
        body: room,
      }),
      invalidatesTags: (_, __, { roomId }) => [{ type: ROOM_TAG, id: roomId }],
    }),
    deleteRoom: builder.mutation<void, { hotelId: string; roomId: string }>({
      query: ({ hotelId, roomId }) => ({
        url: `/${hotelId}/room/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { roomId }) => [
        { type: ROOM_TAG, id: roomId },
        { type: ROOM_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
