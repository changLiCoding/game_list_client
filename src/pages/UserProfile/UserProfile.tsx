import { useParams } from 'react-router-dom';
import { Layout } from 'antd';

import useTokenAuth from '@/hooks/useTokenAuth';
import UserProfileHeader from '@/components/UserProfileHeader';
import ProfileContent from '@/components/ProfileContent';

function UserProfile({ routeName }: { routeName: string }) {
  const { username } = useParams();
  const { loading, userState } = useTokenAuth();
  const { Content } = Layout;
  if (loading || !userState.user) {
    return <div>Loading...</div>;
  }

  console.log(userState);

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
