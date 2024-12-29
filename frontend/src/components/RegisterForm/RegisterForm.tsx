import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import { faker } from "@faker-js/faker";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { useCreateOrganizationMutation } from "../../redux/organization/organization.api";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/auth/auth.api";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [createOrganization] = useCreateOrganizationMutation();
  const [login] = useLoginMutation();

  const [userData, setUserData] = useState({
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
  });
  const [organizationData, setOrganizationData] = useState({
    name: faker.company.name(),
  });

  const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOrganizationDataChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizationData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createOrganization({
        organization: organizationData,
        user: userData,
      });

      if (response.data?.id) {
        const loginResponse = await login({
          email: userData.email,
          password: userData.password,
        });

        if (loginResponse.data?.message) {
          navigate("/app");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">User Data</h2>
      <div className="flex flex-col space-y-2">
        <Label>
          Email
          <Input
            fullWidth
            name="email"
            type="email"
            value={userData.email}
            onChange={handleUserDataChange}
          />
        </Label>
        <PasswordInput
          password={userData.password}
          setPassword={(password: string) =>
            setUserData((prevState) => ({
              ...prevState,
              password,
            }))
          }
        />
        <Label>
          Name
          <Input
            fullWidth
            name="name"
            value={userData.name}
            onChange={handleUserDataChange}
          />
        </Label>
        <Label>
          Phone
          <Input
            fullWidth
            name="phone"
            value={userData.phone}
            onChange={handleUserDataChange}
          />
        </Label>
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-2">Organization Data</h2>
      <div className="flex flex-col space-y-2">
        <Label>
          Name
          <Input
            fullWidth
            name="name"
            value={organizationData.name}
            onChange={handleOrganizationDataChange}
          />
        </Label>
      </div>
      <Button
        type="submit"
        fullWidth
        className="mt-8"
        disabled={
          !(
            userData.email &&
            userData.password &&
            userData.name &&
            userData.phone &&
            organizationData.name
          )
        }
      >
        Register
      </Button>
    </form>
  );
};
