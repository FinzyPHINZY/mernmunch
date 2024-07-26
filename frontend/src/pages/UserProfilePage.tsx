import { useGetMyUser, useUpdateMyUser } from "../api/UserApi";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return (
      <div className="flex justify-center items-center ">
        <span>Loading...</span>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center ">
        <span>Unable to load user profile</span>
      </div>
    );
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
