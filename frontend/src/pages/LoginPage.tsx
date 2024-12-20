import { useNavigate } from "react-router";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useVerifyQuery } from "../redux/auth/auth.api";
import { Loading } from "../components/Loading/Loading";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useVerifyQuery(undefined);

  if (isLoading) {
    return <Loading size="lg" />;
  } else if (user) {
    navigate("/app");
  }

  return (
    <div className="pt-12">
      <LoginForm />
    </div>
  );
};
