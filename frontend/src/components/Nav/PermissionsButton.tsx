import { Link } from "react-router";
import { ConfigIcon } from "../Icons/ConfigIcon";
import { HoverableIcon } from "../Icons/HoverableIcon";

export const PermissionsButton = () => {
  return (
    <Link to={"/app/permissions"} prefetch="render">
      <HoverableIcon>
        <ConfigIcon />
      </HoverableIcon>
    </Link>
  );
};
