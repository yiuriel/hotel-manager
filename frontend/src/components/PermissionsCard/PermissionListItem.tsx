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

  return (
    <li key={permission.name} className="flex items-center gap-2 mb-2">
      <label className="flex items-center" htmlFor={permission.name}>
        <input
          id={permission.name}
          type="checkbox"
          checked={Boolean(isPermissionChecked)}
          disabled={disabled}
          onChange={async () => {
            if (!selectedUser || !organizationId) return;

            const newPermissions = isPermissionChecked
              ? selectedUser.permissions.filter(
                  (p) => p.name !== permission.name
                )
              : [...selectedUser.permissions, { name: permission.name }];

            await updateUserPermissions({
              organizationId,
              id: selectedUser.id,
              permissions: newPermissions.map((p) => p.name),
            });
          }}
        />
        <span className="ml-2">
          <b>{permission.label}</b> - {permission.description}
        </span>
      </label>
    </li>
  );
};
