import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
