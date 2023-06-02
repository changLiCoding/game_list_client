import React from 'react';
import styles from '@/components/ProfileContent/Social/FollowLinks/FollowLinks.module.scss';

function FollowLinks() {
  return (
    <div>
      <div className={styles.followLinksContainer}>
        <div className={styles.linksHeader}>Social</div>
        <span className={`${styles.link} ${styles.selected}`}>Followings</span>
        <span className={styles.link}>Followers</span>
      </div>
    </div>
  );
}

export default FollowLinks;
