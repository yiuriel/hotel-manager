import { FC } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Permission } from "../../redux/permission/permission.types";
import { useUpdateUserPermissionMutation } from "../../redux/user/user.api";
import { User } from "../../redux/user/user.types";

export const PermissionListItem: FC<{
  permission: Permission;
  selectedUser: User | null;
}> = ({ permission, selectedUser }) => {
  const loggedInUserId = useAppSelector((state) => state.auth.userId);
  const organizationId = useAppSelector((state) => state.organization.id);
  const [updateUserPermissions] = useUpdateUserPermissionMutation();

  const isExtraPermission = selectedUser?.permissions.some(
    (p) => p.name === permission.name
  );
  const isPermissionChecked =
    isExtraPermission ||
    selectedUser?.role.permissions.some((p) => p.name === permission.name);

  const disabled = Boolean(
    !selectedUser?.role.editable ||
      selectedUser?.id === loggedInUserId ||
      (!isExtraPermission && isPermissionChecked)
  );

  const getTooltipText = () => {
    if (!selectedUser?.role.editable) {
      return "This user's role permissions cannot be modified";
    }
    if (selectedUser?.id === loggedInUserId) {
      return "You cannot modify your own permissions";
    }
    if (!isExtraPermission && isPermissionChecked) {
      return "This permission is granted by the user's role and cannot be removed";
    }
    return "";
  };

  const handlePermissionChange = async () => {
    if (!selectedUser || !organizationId) return;

    try {
      const newPermissions = isPermissionChecked
        ? selectedUser.permissions.filter((p) => p.name !== permission.name)
        : [...selectedUser.permissions, { name: permission.name }];

      await updateUserPermissions({
        organizationId,
        id: selectedUser.id,
        permissions: newPermissions.map((p) => p.name),
      });
    } catch (error) {
      console.error("Error updating user permissions:", error);
    }
  };

  return (
    <li className="relative group bg-white p-4 rounded-md shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            id={permission.name}
            checked={Boolean(isPermissionChecked)}
            disabled={disabled}
            onChange={handlePermissionChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex-grow">
          <label
            htmlFor={permission.name}
            className="block cursor-pointer"
            title={getTooltipText()}
          >
            <span className="block font-medium text-gray-900 mb-1">
              {permission.label}
              {isExtraPermission && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Extra
                </span>
              )}
            </span>
            <span className="text-sm text-gray-500">
              {permission.description}
            </span>
          </label>
        </div>
      </div>

      {disabled && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {getTooltipText()}
        </div>
      )}
    </li>
  );
};
