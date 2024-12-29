import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetUsersQuery } from "../../redux/user/user.api";
import { AddUserForm } from "../AddUserForm/AddUserForm";
import { Card } from "../Card/Card";
import { PlusCircleIcon } from "../Icons/PlusCircleIcon";
import { OrganizationUserMenuItem } from "./OrganizationUserMenuItem";
import { HoverableIcon } from "../Icons/HoverableIcon";
import { Loading } from "../Loading/Loading";

export const OrganizationUsersDashboard = () => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [getUsers, { data = [], isLoading }] = useLazyGetUsersQuery();
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  useEffect(() => {
    if (organizationId) {
      getUsers(organizationId);
    }
  }, [getUsers, organizationId]);

  if (!organizationId) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center p-6 text-red-600">
          <p className="text-lg font-medium">Organization Not Found</p>
          <p className="text-sm mt-2">
            Please check your organization settings
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      actions={[
        {
          label: (
            <div className="flex items-center gap-2 h-5">
              Add User{" "}
              <HoverableIcon color="secondary">
                <PlusCircleIcon />
              </HoverableIcon>
            </div>
          ),
          action: () => setShowAddUserForm(true),
        },
      ]}
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loading />
          </div>
        ) : data.length > 0 ? (
          <div className="space-y-2">
            {data.map((user) => (
              <OrganizationUserMenuItem key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm mt-2">Add users to your organization</p>
          </div>
        )}
      </div>
      {showAddUserForm && (
        <AddUserForm onClose={() => setShowAddUserForm(false)} />
      )}
    </Card>
  );
};
