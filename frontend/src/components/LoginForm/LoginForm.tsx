import { useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/auth/auth.api";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  return (
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
          if ("data" in response) {
            navigate("/app");
          }
        } catch (error) {
          console.log(error);
        }
      }}
      className="space-y-6"
    >
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Email address
          <Input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </Label>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Password
          <Input
            type="password"
            name="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </Label>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};
