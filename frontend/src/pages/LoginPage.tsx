import { useNavigate } from "react-router";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useVerifyQuery } from "../redux/auth/auth.api";
import { Loading } from "../components/Loading/Loading";
import { useEffect } from "react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useVerifyQuery(undefined);

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/app");
    }
  }, [user, navigate, isLoading]);

  if (isLoading) {
    return <Loading size="lg" />;
  }

  return (
    <div className="pt-12">
      <LoginForm />
    </div>
  );
};
