import { Layout } from 'antd';

import useTokenAuth from '@/hooks/useTokenAuth';
import UserProfileHeader from '@/components/UserProfileHeader';
import ProfileContent from '@/components/ProfileContent';

function UserProfile({ routeName }: { routeName: string }) {
  const { loading, userState } = useTokenAuth();
  const { Content } = Layout;
  if (loading || !userState.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserProfileHeader userState={userState} />
      <ProfileContent routeName={routeName} />
    </div>
  );
}

export default UserProfile;
