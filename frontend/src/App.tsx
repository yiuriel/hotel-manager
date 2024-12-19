import { Outlet, useNavigate } from "react-router";
import { Nav } from "./components/Nav/Nav";
import { useVerifyQuery } from "./redux/auth/auth.api";

export function App() {
  const navigate = useNavigate();
  const { error, isLoading } = useVerifyQuery(undefined);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  } else if (error) {
    navigate("/");
  }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
