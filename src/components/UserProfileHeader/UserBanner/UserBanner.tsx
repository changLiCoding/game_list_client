import { InitialStateType } from '@/features/types';

function UserBanner({ userState }: { userState: InitialStateType }) {
  const { user, loading } = userState;

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  return <div>UserBanner for {userState.user.username}</div>;
}

export default UserBanner;
