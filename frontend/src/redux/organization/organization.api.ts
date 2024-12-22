import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/organization`,
  }),
  endpoints: (builder) => ({
    getOrganization: builder.query({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetOrganizationQuery, useLazyGetOrganizationQuery } =
  organizationApi;
