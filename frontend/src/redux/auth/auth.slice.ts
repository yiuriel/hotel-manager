import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth.api";

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.verify.matchRejected, (state) => {
        state.isLoggedIn = false;
        state.userId = null;
      })
      .addMatcher(authApi.endpoints.verify.matchFulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userId = action.payload.id;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.isLoggedIn = false;
        state.userId = null;
      });
  },
});

// export const {} = authSlice.actions;

export const selectIsLoggedIn = (state: AuthState) => state.isLoggedIn;
export const selectUserId = (state: AuthState) => state.userId;
