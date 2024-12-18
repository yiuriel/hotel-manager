import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "../redux/auth/auth.api";

export const LogoutPage = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout(undefined);

      navigate("/");
    };

    doLogout();
  }, [logout, navigate]);

  return null;
};
