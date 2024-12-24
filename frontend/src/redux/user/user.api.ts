import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./user.types";

const USER_TAG = "USER";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/organization`,
  }),
  tagTypes: [USER_TAG],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      query: (organizationId) => ({
        url: `/${organizationId}/user`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: USER_TAG, id })) : [],
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: USER_TAG, id }],
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useUpdateUserMutation } =
  userApi;
