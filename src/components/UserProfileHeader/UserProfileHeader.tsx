import { InitialStateType } from '@/features/types';
import UserBanner from '@/components/UserProfileHeader/UserBanner/UserBanner';
import UserLinks from '@/components/UserProfileHeader/UserLinks/UserLinks';

function UserProfileHeader({ userState }: { userState: InitialStateType }) {
  const { user, loading } = userState;

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      UserProfileHeader for {user.username}
      <UserBanner userState={userState} />
      <UserLinks />
    </div>
  );
}

export default UserProfileHeader;
