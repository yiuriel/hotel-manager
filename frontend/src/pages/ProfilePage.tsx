import { useProfileQuery } from "../redux/auth/auth.api";
import { Profile } from "../components/Profile/Profile";

export const ProfilePage = () => {
  const { data: user, isLoading } = useProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <Profile user={user} />
    </div>
  );
};
