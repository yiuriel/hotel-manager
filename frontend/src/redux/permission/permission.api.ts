import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Permission } from "./permission.types";

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
  }),
  endpoints: (builder) => ({
    getPermissions: builder.query<Permission[], void>({
      query: () => "permission",
    }),
  }),
});

export const { useGetPermissionsQuery } = permissionApi;
