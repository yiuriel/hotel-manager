import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { store } from "./redux/store.ts";

import "./index.css";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { HotelPage } from "./pages/HotelPage.tsx";
import { AddHotelPage } from "./pages/AddHotelPage.tsx";
import { HotelsGridPage } from "./pages/HotelsGridPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/app" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="hotel" element={<HotelsGridPage />} />
            <Route path="hotel/new" element={<AddHotelPage />} />
            <Route path="hotel/:hotelId" element={<HotelPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
