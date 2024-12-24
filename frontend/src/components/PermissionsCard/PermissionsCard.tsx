import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Permission } from "../../redux/permission/permission.types";
import { useLazyGetUsersQuery } from "../../redux/user/user.api";
import { User } from "../../redux/user/user.types";

export const PermissionsCard: FC<{ permissions: Permission[] }> = ({
  permissions,
}) => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const loggedInUserId = useAppSelector((state) => state.auth.userId);
  const [fetchUsers, { data: users }] = useLazyGetUsersQuery(undefined);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (organizationId) {
      fetchUsers(organizationId);
    }
  }, [fetchUsers, organizationId]);

  useLayoutEffect(() => {
    if (users) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  return (
    <div className="bg-white rounded-md shadow-lg m-4 p-4">
      <div className="flex items-center justify-between my-2">
        <h2 className="text-lg font-bold">Permissions</h2>
        <div className="flex gap-2 items-center">
          <label className="gap-2 flex items-center" htmlFor="user">
            user -&gt;
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
            role -&gt;
            <select
              id="user"
              name="user"
              value={selectedUser?.role.name || ""}
              className="border rounded p-1 pr-2"
              onChange={(e) =>
                setSelectedUser(
                  users?.find((user) => user.role.name === e.target.value) ||
                    null
                )
              }
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
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {permissions.map((permission) => {
          const isExtraPermission = selectedUser?.permissions.some(
            (p) => p.name === permission.name
          );
          const isPermissionChecked =
            isExtraPermission ||
            selectedUser?.role.permissions.some(
              (p) => p.name === permission.name
            );
          return (
            <li key={permission.name} className="flex items-center gap-2 mb-2">
              <label className="flex items-center" htmlFor={permission.name}>
                <input
                  type="checkbox"
                  checked={Boolean(isPermissionChecked)}
                  disabled={
                    !selectedUser?.role.editable ||
                    selectedUser?.id === loggedInUserId ||
                    !isExtraPermission
                  }
                  onChange={() => {}}
                />
                <span className="ml-2">
                  <b>{permission.label}</b> - {permission.description}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
