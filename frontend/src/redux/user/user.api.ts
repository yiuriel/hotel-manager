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
    updateUser: builder.mutation<
      User,
      Partial<User> & { organizationId: string; id: string }
    >({
      query: ({ id, organizationId, ...patch }) => ({
        url: `/${organizationId}/user/${id}`,
        method: "PATCH",
        credentials: "include",
        body: { ...patch, id },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: USER_TAG, id }],
    }),
    updateUserPermission: builder.mutation<
      User,
      { permissions: string[] } & { organizationId: string; id: string }
    >({
      query: ({ id, organizationId, ...permissions }) => ({
        url: `/${organizationId}/user/${id}/permission`,
        method: "PATCH",
        credentials: "include",
        body: { permissions: permissions.permissions },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: USER_TAG, id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
  useUpdateUserPermissionMutation,
} = userApi;
