import React from 'react';
import styles from '@/components/ProfileContent/Social/Follows/Follows.module.scss';
import { User as UserType } from '@/graphql/__generated__/graphql';

function Follows({ follows }: { follows: UserType[] }) {
  console.log(follows);

  return (
    <div>
      <div className={styles.followsContainer}>
        {follows.map((follow) => (
          <div key={follow.followedId}>{follow.followed.username}</div>
        ))}
      </div>
    </div>
  );
}

export default Follows;
