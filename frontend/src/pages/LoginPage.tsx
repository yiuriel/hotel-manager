import { useEffect } from "react";
import { useLoginMutation, useLazyVerifyQuery } from "../redux/auth/auth.api";

export const LoginPage = () => {
  const [login] = useLoginMutation();
  const [verify, { data: verifyData }] = useLazyVerifyQuery();

  useEffect(() => {
    const loginData = {
      email: "admin@example.com",
      password: "password",
    };

    const doLogin = async () => {
      try {
        const response = await login(loginData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    doLogin();
  }, []);

  useEffect(() => {
    const doVerify = async () => {
      try {
        const response = await verify(undefined);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    doVerify();
  }, []);

  return (
    <>
      <h1>Login</h1>
    </>
  );
};
