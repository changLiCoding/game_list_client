import React from 'react';
import { CloseCircleFilled, CloseOutlined } from '@ant-design/icons';

import styles from '@/components/ProfileContent/Social/Follows/Follows.module.scss';
import { Follow as FollowType } from '@/graphql/__generated__/graphql';

function Follows({ follows }: { follows: FollowType[] }) {
  console.log(follows);

  return (
    <div>
      <div className={styles.followsContainer}>
        {follows.map((follow) => (
          <div className={styles.followCard} key={follow.followedId}>
            <div
              className={styles.followAvatar}
              style={{ backgroundImage: `url(${follow.followed.userPicture})` }}
            >
              <a href={`/user/${follow.followed.username}/`}>
                {follow.followed.username}
              </a>
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
