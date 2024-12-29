import { FC } from "react";
import { HoverableIcon } from "../../Icons/HoverableIcon";
import { ProfileIcon } from "../../Icons/ProfileIcon";

export const ProfileNavItem: FC<{
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}> = ({ onClick }) => {
  return (
    <div
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      <HoverableIcon>
        <ProfileIcon />
      </HoverableIcon>
    </div>
  );
};
