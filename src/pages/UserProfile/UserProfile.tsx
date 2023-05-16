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
    <Layout>
      <Content>
        <UserProfileHeader userState={userState} />
        <ProfileContent routeName={routeName} />
      </Content>
    </Layout>
  );
}

export default UserProfile;
