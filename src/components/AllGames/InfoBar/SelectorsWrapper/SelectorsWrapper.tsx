import React from 'react';
import {
  EllipsisOutlined,
  AppstoreFilled,
  UnorderedListOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import styles from '@/components/AllGames/InfoBar/SelectorsWrapper/SelectorsWrapper.module.scss';

function SelectorsWrapper() {
  return (
    <div className={styles.selectorsContainer}>
      <div className={styles.sortSelector}>
        {/* <MoreOutlined /> */}
        <EllipsisOutlined />
        <span>Rating</span>
      </div>
      <div className={styles.wrapper}>
        <AppstoreFilled className={styles.selectorIcon} />
        <UnorderedListOutlined className={styles.selectorIcon} />
      </div>
    </div>
  );
}

export default SelectorsWrapper;
