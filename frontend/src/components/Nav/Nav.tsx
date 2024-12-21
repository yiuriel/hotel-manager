import { Link } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { UserMenu } from "./UserMenu";
import { HomeIcon } from "../Icons/HomeIcon";
import { HoverableIcon } from "../Icons/HoverableIcon";

export const Nav = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className="flex justify-between p-4 shadow-md sticky top-0 z-10 bg-white">
      <div className="flex gap-2">
        <Link prefetch="viewport" to="/app">
          <HoverableIcon>
            <HomeIcon />
          </HoverableIcon>
        </Link>
      </div>
      <div className="flex gap-2">{isLoggedIn && <UserMenu />}</div>
    </nav>
  );
};
