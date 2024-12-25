import { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetUsersQuery } from "../../redux/user/user.api";
import { User } from "../../redux/user/user.types";
import { PermissionsList } from "./PermissionsList";

export const PermissionsCard = () => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [fetchUsers, { data: users }] = useLazyGetUsersQuery(undefined);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (organizationId) {
      fetchUsers(organizationId);
    }
  }, [fetchUsers, organizationId]);

  useLayoutEffect(() => {
    if (users) {
      if (selectedUser) {
        setSelectedUser(
          users.find((user) => user.id === selectedUser.id) || null
        );
      } else {
        setSelectedUser(users[0]);
      }
    }
  }, [selectedUser, users]);

  return (
    <div className="bg-white rounded-md shadow-lg m-4 p-4">
      <div className="flex items-center justify-between my-2">
        <h2 className="text-lg font-bold">Permissions</h2>
        <div className="flex gap-2 items-center">
          <label className="gap-2 flex items-center" htmlFor="user">
            user:
            <select
              id="user"
              name="user"
              value={selectedUser?.id || ""}
              className="border rounded p-1 pr-2"
              onChange={(e) =>
                setSelectedUser(
                  users?.find((user) => user.id === e.target.value) || null
                )
              }
            >
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label className="gap-2 flex items-center" htmlFor="user">
            role:
            <select
              id="user"
              name="user"
              value={selectedUser?.role.name || ""}
              className="border rounded p-1 pr-2"
              disabled
            >
              {users?.map((user) => (
                <option key={user.role.name} value={user.role.name}>
                  {user.role.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <PermissionsList selectedUser={selectedUser} />
    </div>
  );
};
