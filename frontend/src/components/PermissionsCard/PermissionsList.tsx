import { FC } from "react";
import { useGetPermissionsQuery } from "../../redux/permission/permission.api";
import { Loading } from "../Loading/Loading";
import { PermissionListItem } from "./PermissionListItem";
import { User } from "../../redux/user/user.types";

export const PermissionsList: FC<{ selectedUser: User | null }> = ({
  selectedUser,
}) => {
  const {
    data: permissions,
    isLoading,
    isUninitialized,
  } = useGetPermissionsQuery(undefined);

  if (isLoading || isUninitialized || !permissions) {
    return <Loading />;
  }

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {permissions.map((permission) => {
        return (
          <PermissionListItem
            key={permission.name}
            permission={permission}
            selectedUser={selectedUser}
          />
        );
      })}
    </ul>
  );
};
