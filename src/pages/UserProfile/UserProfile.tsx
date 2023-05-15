import { useParams } from 'react-router-dom';
import { Layout } from 'antd';

import useTokenAuth from '@/hooks/useTokenAuth';
import UserProfileHeader from '@/components/UserProfileHeader';

function UserProfile() {
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
        <div>
          <div>{userState.user.username} header </div>
        </div>

        <div>
          <div>{userState.user.username} content</div>
        </div>
      </Content>
    </Layout>
  );
}

export default UserProfile;
