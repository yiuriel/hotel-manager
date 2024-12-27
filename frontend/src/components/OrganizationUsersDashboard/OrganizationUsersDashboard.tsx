import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetUsersQuery } from "../../redux/user/user.api";
import { Card } from "../Card/Card";
import { OrganizationUserMenuItem } from "./OrganizationUserMenuItem";

export const OrganizationUsersDashboard = () => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [getUsers, { data = [] }] = useLazyGetUsersQuery();

  useEffect(() => {
    if (organizationId) {
      getUsers(organizationId);
    }
  }, [getUsers, organizationId]);

  if (!organizationId) {
    return <div>Organization not found</div>;
  }

  return (
    <Card>
      {data.map((user) => (
        <OrganizationUserMenuItem key={user.id} user={user} />
      ))}
    </Card>
  );
};
