import { Link, useNavigate } from "react-router";
import { ProfileIcon } from "../Icons/ProfileIcon";
import { Menu } from "../Menu/Menu";
import { useState } from "react";
import { MenuItem } from "../Menu/MenuItem";
import { useLogoutMutation } from "../../redux/auth/auth.api";
import { HoverableIcon } from "../Icons/HoverableIcon";

export const UserMenu = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();

          setAnchorEl(e.currentTarget);
        }}
      >
        <HoverableIcon>
          <ProfileIcon />
        </HoverableIcon>
      </div>
      {anchorEl && (
        <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          <Link prefetch="viewport" to="/app/profile">
            <MenuItem color="secondary">Profile</MenuItem>
          </Link>
          <MenuItem
            color="secondary"
            onClick={async () => {
              await logout(undefined);

              navigate("/");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
};
