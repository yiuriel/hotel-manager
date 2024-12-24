import { Loading } from "../components/Loading/Loading";
import { PermissionsCard } from "../components/PermissionsCard/PermissionsCard";
import { useGetPermissionsQuery } from "../redux/permission/permission.api";

export const PermissionsPage = () => {
  const { data, isLoading, isUninitialized } =
    useGetPermissionsQuery(undefined);

  if (isLoading || isUninitialized || !data) {
    return <Loading />;
  }

  return <PermissionsCard permissions={data} />;
};
