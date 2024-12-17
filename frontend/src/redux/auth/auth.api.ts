import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/auth" }),
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
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyVerifyQuery, useLogoutMutation } =
  authApi;
