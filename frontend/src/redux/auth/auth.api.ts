import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/auth" }),
  tagTypes: ["VERIFY"],
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
      providesTags: ["VERIFY"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
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
