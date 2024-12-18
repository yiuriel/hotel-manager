import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { Label } from "../components/Label/Label";
import { useLoginMutation } from "../redux/auth/auth.api";

export const LoginPage = () => {
  const [login] = useLoginMutation();

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const formData = new FormData(e.currentTarget);
            const loginData = {
              email: formData.get("email") as string,
              password: formData.get("password") as string,
            };
            const response = await login(loginData);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }}
        className="flex flex-col gap-2 w-1/2 mx-auto"
      >
        <Label>
          Email:
          <Input type="email" name="email" />
        </Label>
        <Label>
          Password:
          <Input type="password" name="password" />
        </Label>
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};
