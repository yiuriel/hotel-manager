import { Link, useNavigate } from "react-router";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <LoginForm />
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
