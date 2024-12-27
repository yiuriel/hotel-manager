import { FC, useMemo } from "react";
import { useGetPermissionsQuery } from "../../redux/permission/permission.api";
import { Loading } from "../Loading/Loading";
import { PermissionListItem } from "./PermissionListItem";
import { User } from "../../redux/user/user.types";
import { Permission } from "../../redux/permission/permission.types";

interface PermissionsListProps {
  selectedUser: User | null;
  searchTerm: string;
}

type PermissionGroup = {
  name: string;
  permissions: Permission[];
};

const groupPermissions = (permissions: Permission[]): PermissionGroup[] => {
  const groups = permissions.reduce((acc, permission) => {
    // Extract group from permission name (e.g., "user.create" -> "user")
    const group = permission.name.split('.')[0];
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return Object.entries(groups).map(([name, permissions]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    permissions: permissions.sort((a, b) => a.label.localeCompare(b.label))
  }));
};

export const PermissionsList: FC<PermissionsListProps> = ({
  selectedUser,
  searchTerm
}) => {
  const {
    data: permissions,
    isLoading,
    isUninitialized,
    error
  } = useGetPermissionsQuery(undefined);

  const filteredAndGroupedPermissions = useMemo(() => {
    if (!permissions) return [];

    const filtered = permissions.filter(permission => 
      permission.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return groupPermissions(filtered);
  }, [permissions, searchTerm]);

  if (isLoading || isUninitialized) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Failed to load permissions. Please try again later.
      </div>
    );
  }

  if (!permissions || permissions.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No permissions found.
      </div>
    );
  }

  if (filteredAndGroupedPermissions.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No permissions match your search.
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {filteredAndGroupedPermissions.map((group) => (
        <div key={group.name} className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{group.name}</h3>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {group.permissions.map((permission) => (
              <PermissionListItem
                key={permission.name}
                permission={permission}
                selectedUser={selectedUser}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
