import { faker } from "@faker-js/faker";
import { FC, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useAddUserMutation } from "../../redux/user/user.api";
import { Button } from "../Button/Button";
import { Dialog } from "../Dialog/Dialog";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import { PasswordInput } from "../PasswordInput/PasswordInput";

export const AddUserForm: FC<{
  onClose: () => void;
  onSuccess?: (userId: string) => void;
}> = ({ onClose, onSuccess }) => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [name, setName] = useState(faker.person.fullName());
  const [email, setEmail] = useState(faker.internet.email());
  const [password, setPassword] = useState(
    faker.internet.password({
      length: 10,
    })
  );
  const [phone, setPhone] = useState(faker.phone.number());
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!organizationId) {
      return;
    }

    const userResponse = await addUser({
      organizationId,
      name,
      email,
      password,
      phone,
    });

    if (onSuccess && "data" in userResponse && userResponse.data?.id) {
      onSuccess(userResponse.data.id);
    }
    onClose();
  };

  return (
    <Dialog title="Add User" open={true} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            id="name"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
            className="w-full"
          />
        </div>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          containerClassName="flex flex-col gap-1"
        />
        <div className="flex flex-col gap-1">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            id="phone"
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          Add User
        </Button>
      </form>
    </Dialog>
  );
};
