import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Nav } from "./components/Nav/Nav";
import { useAppStartup } from "./hooks/useAppStartup";
import { Loading } from "./components/Loading/Loading";

export function App() {
  const navigate = useNavigate();
  const { loading, error } = useAppStartup();

  useEffect(() => {
    if (!loading && error) {
      navigate("/");
    }
  }, [loading, error, navigate]);

  if (loading) {
    return <Loading size="lg" />;
  }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
