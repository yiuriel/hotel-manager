import { Link } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { UserMenu } from "./UserMenu";

export const Nav = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className="flex justify-between p-4 shadow-md">
      <div className="flex gap-2">
        <Link prefetch="viewport" to="/app">
          Home
        </Link>
      </div>
      <div className="flex gap-2">{isLoggedIn && <UserMenu />}</div>
    </nav>
  );
};
