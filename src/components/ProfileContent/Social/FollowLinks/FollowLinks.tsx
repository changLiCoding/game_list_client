import React from 'react';
import styles from '@/components/ProfileContent/Social/FollowLinks/FollowLinks.module.scss';

function FollowLinks({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <div className={styles.followLinksContainer}>
        <div className={styles.linksHeader}>Social</div>
        <span
          onClick={() => setSelectedFilter('Followings')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSelectedFilter('Followings');
            }
          }}
          role="button"
          tabIndex={0}
          className={`${styles.link} ${
            selectedFilter === 'Followings' && styles.selected
          }`}
        >
          Followings
        </span>
        <span
          onClick={() => setSelectedFilter('Followers')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSelectedFilter('Followers');
            }
          }}
          role="button"
          tabIndex={0}
          className={`${styles.link} ${
            selectedFilter === 'Followers' && styles.selected
          }`}
        >
          Followers
        </span>
      </div>
    </div>
  );
}

export default FollowLinks;
