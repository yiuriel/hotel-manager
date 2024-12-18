import { Link } from "react-router";
import { ProfileIcon } from "../Icons/ProfileIcon";
import { useVerifyQuery } from "../../redux/auth/auth.api";

export const Nav = () => {
  const { data: user } = useVerifyQuery(undefined);

  return (
    <nav className="flex gap-2 justify-between px-4 py-2">
      <div className="flex gap-2">
        <Link prefetch="viewport" to="/">
          Home
        </Link>
        {!user && (
          <Link prefetch="viewport" to="/login">
            Login
          </Link>
        )}
      </div>
      <div className="flex gap-2">
        {user && (
          <>
            <Link prefetch="viewport" to="/logout">
              Logout
            </Link>
            <Link prefetch="viewport" to="/profile">
              <ProfileIcon />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
