import { Outlet } from "react-router";
import { Nav } from "./components/Nav/Nav";

export function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
