import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/auth" }),
  tagTypes: ["Verify"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Verify"],
    }),
    verify: builder.query({
      query: () => ({
        url: "verify",
        method: "POST",
        credentials: "include",
      }),
      providesTags: ["Verify"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Verify"],
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyQuery,
  useLazyVerifyQuery,
  useLogoutMutation,
} = authApi;
