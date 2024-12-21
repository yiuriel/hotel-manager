import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { hotelApi } from "./hotel.api";
import { HotelResponse } from "./hotel.types";

export type HotelState = {
  currentHotel: HotelResponse | null;
  selectedStaffMember: string | null;
};

const initialState: HotelState = {
  currentHotel: null,
  selectedStaffMember: null,
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setSelectedStaffMember: (state, action: PayloadAction<string>) => {
      state.selectedStaffMember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      hotelApi.endpoints.getHotelById.matchFulfilled,
      (state, { payload }) => {
        state.currentHotel = payload;
      }
    );
  },
});

export const { setSelectedStaffMember } = hotelSlice.actions;

export const selectHotel = (state: RootState) => state.hotel;
export const selectCurrentHotel = (state: RootState) =>
  state.hotel.currentHotel;
export const selectSelectedStaffMember = createSelector(
  (state: RootState) => state.hotel,
  (state) => state.selectedStaffMember
);

export const selectStaffShiftsByStaffId = (staffId: string | null) =>
  createSelector(
    (state: RootState) => {
      return state.hotel.currentHotel;
    },
    (currentHotel) => {
      if (!staffId) {
        return [];
      }

      if (!currentHotel) return [];

      const staff = currentHotel.staff.find((s) => s.id === staffId);
      if (!staff) return [];

      return staff.shifts;
    }
  );

export default hotelSlice.reducer;
