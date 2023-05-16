import {
  EllipsisOutlined,
  AppstoreFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import styles from '@/components/AllGames/InfoBar/SelectorsWrapper/SelectorsWrapper.module.scss';
import type { SelectorsWrapperType } from '@/components/AllGames/InfoBar/types';

function SelectorsWrapper({ isCardView, setIsCardView }: SelectorsWrapperType) {
  const [sortBy, setSortBy] = useState('Average Score');

  const sortItems: MenuProps['items'] = [
    'Average Score',
    'Newest',
    'Oldest',
    'Title',
    'Trending',
    'Popularity',
    'Date Added',
  ].map((item) => ({
    key: item,
    label: (
      <button
        type="button"
        onClick={() => setSortBy(item)}
        style={{
          cursor: 'pointer',
          width: '100%',
          minHeight: '22px',
          backgroundColor: 'transparent',
          color: 'rgb(116,136,153)',
          border: 'none',
        }}
      >
        {item}
      </button>
    ),
  }));

  return (
    <div className={styles.selectorsContainer}>
      <Dropdown
        arrow
        menu={{ items: sortItems }}
        trigger={['click']}
        placement="bottom"
      >
        <div className={styles.sortSelector}>
          {/* <MoreOutlined /> */}
          <EllipsisOutlined />

          <span>{sortBy}</span>
        </div>
      </Dropdown>
      <div className={styles.wrapper}>
        <AppstoreFilled
          onClick={() => setIsCardView(true)}
          className={`${styles.selectorIcon} ${isCardView && styles.selected}`}
        />
        <UnorderedListOutlined
          onClick={() => setIsCardView(false)}
          className={`${styles.selectorIcon} ${!isCardView && styles.selected}`}
        />
      </div>
    </div>
  );
}

export default SelectorsWrapper;
