import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import styles from '@/components/ProfileContent/Social/Follows/Follows.module.scss';
import { User as UserType } from '@/graphql/__generated__/graphql';
import useAddRemoveFollow from '@/services/follows/useAddRemoveFollow';
import useNotification from '@/hooks/useNotification';

function Follows({
  follows,
  loading,
  followers,
  selectedFilter,
}: {
  follows: UserType[];
  loading: boolean;
  followers: UserType[];
  selectedFilter: string;
}) {
  const { addFollow, removeFollow } = useAddRemoveFollow();

  const { success, contextHolder, warning } = useNotification();

  const handleRemoveFollow = (followedUser: UserType) => {
    Modal.confirm({
      title: `Are you sure you want to unfollow ${followedUser.username}?`,
      content: 'You will no longer see their posts in your feed.',
      onOk: async () => {
        const response = await removeFollow(followedUser.id);

        if (response?.follow && response?.errors?.length === 0) {
          success(`You have unfollowed ${followedUser.username} successfully.`);
        } else {
          warning(
            `There is something wrong when processing unfollow ${followedUser.username}!`
          );
        }
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const loadedData = selectedFilter === 'Followings' ? follows : followers;

  return (
    <div>
      <div className={styles.followsContainer}>
        {loadedData.map((follow) => (
          <div className={styles.followCard} key={follow.id}>
            <div
              className={styles.followAvatar}
              style={{ backgroundImage: `url(${follow.userPicture})` }}
            >
              <a href={`/user/${follow.username}/`}>{follow.username}</a>
            </div>
            <div className={styles.unfollow}>
              <CloseOutlined onClick={() => handleRemoveFollow(follow)} />{' '}
            </div>
          </div>
        ))}
      </div>
      {contextHolder}
    </div>
  );
}

export default Follows;
