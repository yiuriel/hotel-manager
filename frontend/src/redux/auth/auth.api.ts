import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VERIFY_TAG = "VERIFY";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/auth`,
  }),
  tagTypes: [VERIFY_TAG],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    verify: builder.query({
      query: () => ({
        url: "verify",
        method: "POST",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      providesTags: [VERIFY_TAG],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: [VERIFY_TAG],
    }),
    profile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyQuery,
  useLazyVerifyQuery,
  useLogoutMutation,
  useProfileQuery,
} = authApi;
