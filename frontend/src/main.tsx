import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { store } from "./redux/store.ts";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import { AddHotelPage } from "./pages/AddHotelPage.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { HotelPage } from "./pages/HotelPage.tsx";
import { HotelRoomsPage } from "./pages/HotelRoomsPage.tsx";
import { HotelsGridPage } from "./pages/HotelsGridPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { PermissionsPage } from "./pages/PermissionsPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/app" element={<App />}>
              <Route index element={<Dashboard />} />
              <Route path="permissions" element={<PermissionsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="hotel" element={<HotelsGridPage />} />
              <Route path="hotel/new" element={<AddHotelPage />} />
              <Route path="hotel/:hotelId" element={<HotelPage />} />
              <Route path="hotel/:hotelId/room" element={<HotelRoomsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </StrictMode>
);
