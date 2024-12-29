import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserCreate } from "../user/user.types";
import { OrganizationCreate } from "./organization.types";

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
    createOrganization: builder.mutation<
      { id: string },
      {
        user: UserCreate;
        organization: OrganizationCreate;
      }
    >({
      query: ({ user, organization }) => ({
        url: "",
        method: "POST",
        body: { organization, user },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useLazyGetOrganizationQuery,
  useCreateOrganizationMutation,
} = organizationApi;
