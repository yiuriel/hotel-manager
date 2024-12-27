import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetUsersQuery } from "../../redux/user/user.api";
import { AddUserForm } from "../AddUserForm/AddUserForm";
import { Card } from "../Card/Card";
import { PlusCircleIcon } from "../Icons/PlusCircleIcon";
import { OrganizationUserMenuItem } from "./OrganizationUserMenuItem";
import { HoverableIcon } from "../Icons/HoverableIcon";

export const OrganizationUsersDashboard = () => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [getUsers, { data = [] }] = useLazyGetUsersQuery();
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  useEffect(() => {
    if (organizationId) {
      getUsers(organizationId);
    }
  }, [getUsers, organizationId]);

  if (!organizationId) {
    return <div>Organization not found</div>;
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
      {data.map((user) => (
        <OrganizationUserMenuItem key={user.id} user={user} />
      ))}
      {showAddUserForm && (
        <AddUserForm onClose={() => setShowAddUserForm(false)} />
      )}
    </Card>
  );
};
