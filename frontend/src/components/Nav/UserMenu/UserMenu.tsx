import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogoutMutation } from "../../../redux/auth/auth.api";
import { Menu } from "../../Menu/Menu";
import { MenuItem } from "../../Menu/MenuItem";
import { PermissionsButton } from "../PermissionsButton";
import { ProfileNavItem } from "./ProfileNavItem";
import { ShiftsNavItem } from "./ShiftsNavItem";

export const UserMenu = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <ShiftsNavItem />
      <PermissionsButton />
      <ProfileNavItem onClick={(e) => setAnchorEl(e.currentTarget)} />
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
