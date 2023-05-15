import { InitialStateType } from '@/features/types';

function UserProfileHeader({ userState }: { userState: InitialStateType }) {
  const { user, loading } = userState;

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return <div>UserProfileHeader for {user.username}</div>;
}

export default UserProfileHeader;
