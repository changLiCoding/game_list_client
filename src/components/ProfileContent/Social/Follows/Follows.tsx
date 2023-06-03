import { CloseOutlined } from '@ant-design/icons';

import styles from '@/components/ProfileContent/Social/Follows/Follows.module.scss';
import { User as UserType } from '@/graphql/__generated__/graphql';

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
              <CloseOutlined />{' '}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Follows;
