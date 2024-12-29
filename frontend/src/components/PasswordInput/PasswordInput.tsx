import { FC, useState } from "react";
import { EyeIcon } from "../Icons/EyeIcon";
import { EyeOffIcon } from "../Icons/EyeOffIcon";
import { HoverableIcon } from "../Icons/HoverableIcon";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";

export const PasswordInput: FC<{
  password: string;
  setPassword: (password: string) => void;
  showLabel?: boolean;
  containerClassName?: string;
  showPasswordByDefault?: boolean;
}> = ({
  password,
  setPassword,
  showLabel = true,
  containerClassName,
  showPasswordByDefault = true,
}) => {
  const [showPassword, setShowPassword] = useState(showPasswordByDefault);
  return (
    <div className={`relative ${containerClassName}`}>
      {showLabel && <Label htmlFor="password">Password</Label>}
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
  );
};
