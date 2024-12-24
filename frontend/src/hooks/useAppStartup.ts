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
  ] = useLazyVerifyQuery();
  const [
    fetchorganization,
    {
      isLoading: organizationLoading,
      error: organizationError,
      isUninitialized: organizationUninitialized,
    },
  ] = useLazyGetOrganizationQuery();

  useEffect(() => {
    const startUpApp = async () => {
      await Promise.all([
        fetchAuthUser("login", false),
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
