import { useEffect } from "react";
import { useLazyVerifyQuery } from "../redux/auth/auth.api";
import { useLazyGetOrganizationQuery } from "../redux/organization/organization.api";

export const useAppStartup = () => {
  const [
    fetchAuthUser,
    {
      isLoading: isLoadingUser,
      error: userError,
      isUninitialized: userUninitialized,
    },
  ] = useLazyVerifyQuery(undefined);
  const [
    fetchorganization,
    {
      isLoading: organizationLoading,
      error: organizationError,
      isUninitialized: organizationUninitialized,
    },
  ] = useLazyGetOrganizationQuery(undefined);

  useEffect(() => {
    const startUpApp = async () => {
      await Promise.allSettled([
        fetchAuthUser(undefined),
        fetchorganization(undefined),
      ]);
    };

    startUpApp();
  }, [fetchAuthUser, fetchorganization]);

  return {
    loading:
      isLoadingUser ||
      organizationLoading ||
      userUninitialized ||
      organizationUninitialized,
    error: userError || organizationError,
  };
};
