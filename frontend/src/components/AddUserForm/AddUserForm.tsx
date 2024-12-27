import { FC, useState } from "react";
import { useAddUserMutation } from "../../redux/user/user.api";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import { useAppSelector } from "../../redux/hooks";
import { Dialog } from "../Dialog/Dialog";
import { HoverableIcon } from "../Icons/HoverableIcon";
import { EyeOffIcon } from "../Icons/EyeOffIcon";
import { EyeIcon } from "../Icons/EyeIcon";
import { faker } from "@faker-js/faker";

export const AddUserForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [name, setName] = useState(faker.person.fullName());
  const [email, setEmail] = useState(faker.internet.email());
  const [password, setPassword] = useState(
    faker.internet.password({
      length: 10,
    })
  );
  const [showPassword, setShowPassword] = useState(true);
  const [phone, setPhone] = useState(faker.phone.number());
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!organizationId) {
      return;
    }

    await addUser({
      organizationId,
      name,
      email,
      password,
      phone,
    });
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
        <div className="flex flex-col gap-1 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password"
            className="w-full pr-10"
          />
          <HoverableIcon
            className="absolute right-2 bottom-[-6px] transform -translate-y-1/2 w-5 h-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </HoverableIcon>
        </div>
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
