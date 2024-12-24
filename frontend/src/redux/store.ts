import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/auth.api";
import { authSlice } from "./auth/auth.slice";
import { organizationApi } from "./organization/organization.api";
import { organizationSlice } from "./organization/organization.slice";
import { hotelApi } from "./hotel/hotel.api";
import { hotelSlice } from "./hotel/hotel.slice";
import { shiftApi } from "./shift/shift.api";
import { roomApi } from "./room/room.api";
import { permissionApi } from "./permission/permission.api";
import { userApi } from "./user/user.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    organization: organizationSlice.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    hotel: hotelSlice.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [shiftApi.reducerPath]: shiftApi.reducer,
    [permissionApi.reducerPath]: permissionApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(organizationApi.middleware)
      .concat(hotelApi.middleware)
      .concat(roomApi.middleware)
      .concat(shiftApi.middleware)
      .concat(permissionApi.middleware)
      .concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
