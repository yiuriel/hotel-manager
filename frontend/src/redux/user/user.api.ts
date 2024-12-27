import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserCreate } from "./user.types";

const USER_TAG = "USER";
const USERS_TAG = "USERS";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/organization`,
  }),
  tagTypes: [USER_TAG, USERS_TAG],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      query: (organizationId) => ({
        url: `/${organizationId}/user`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [USERS_TAG],
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
      invalidatesTags: [USERS_TAG],
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
      invalidatesTags: [USERS_TAG],
    }),
    addUser: builder.mutation<User, UserCreate & { organizationId: string }>({
      query: ({ organizationId, ...user }) => ({
        url: `/${organizationId}/user`,
        method: "POST",
        credentials: "include",
        body: user,
      }),
      invalidatesTags: [USERS_TAG],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
  useUpdateUserPermissionMutation,
  useAddUserMutation,
} = userApi;
