import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { organizationApi } from "./organization.api";

export interface OrganizationState {
  id: string | null;
}

const initialState: OrganizationState = {
  id: null,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizationId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      organizationApi.endpoints.getOrganization.matchFulfilled,
      (state, { payload }) => {
        state.id = payload.id;
      }
    );
  },
});

export const { setOrganizationId } = organizationSlice.actions;

export const selectOrganizationId = (state: RootState) => state.organization.id;
