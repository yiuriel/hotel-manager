import { useProfileQuery } from "../redux/auth/auth.api";

export const ProfilePage = () => {
  const { data } = useProfileQuery(undefined);

  console.log(data);

  return <div>ProfilePage</div>;
};
