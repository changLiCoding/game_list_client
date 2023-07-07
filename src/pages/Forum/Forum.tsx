import React from 'react';
import styles from '@/pages/Forum/Forum.module.scss';

import Activities from '@/components/Activities';
import Trend from '@/components/Trend';

function Forum() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.forumContainer}>
        <div className={styles.forum}>
          <Activities />
          <Trend />
        </div>
      </div>
    </div>
  );
}

export default Forum;
