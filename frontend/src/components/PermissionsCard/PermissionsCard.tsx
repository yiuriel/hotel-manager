import { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetUsersQuery } from "../../redux/user/user.api";
import { User } from "../../redux/user/user.types";
import { PermissionsList } from "./PermissionsList";

export const PermissionsCard = () => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchUsers, { data: users, isLoading }] =
    useLazyGetUsersQuery(undefined);

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
    <div className="bg-white rounded-md shadow-lg m-4 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">User Permissions</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search permissions..."
              className="px-4 py-2 border rounded-md w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700" htmlFor="user">
              User:
            </label>
            {isLoading ? (
              <div className="h-9 w-48 animate-pulse bg-gray-200 rounded"></div>
            ) : (
              <select
                id="user"
                name="user"
                value={selectedUser?.id || ""}
                className="border rounded-md p-1.5 pr-8 bg-white min-w-[12rem]"
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
            )}
          </div>
        </div>

        {selectedUser && (
          <PermissionsList
            selectedUser={selectedUser}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};
