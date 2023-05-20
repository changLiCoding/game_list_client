import {
  EllipsisOutlined,
  AppstoreFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import styles from '@/components/AllGames/InfoBar/SelectorsWrapper/SelectorsWrapper.module.scss';
import { useAppSelector } from '@/app/hooks';
import { setView } from '@/features/homeSearchSlice';

function SelectorsWrapper() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const dispatch = useDispatch();
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
          onClick={() => dispatch(setView('grid'))}
          className={`${styles.selectorIcon} ${
            homeSearchState.view === 'grid' && styles.selected
          }`}
        />
        <UnorderedListOutlined
          onClick={() => dispatch(setView('list'))}
          className={`${styles.selectorIcon} ${
            homeSearchState.view === 'list' && styles.selected
          }`}
        />
      </div>
    </div>
  );
}

export default SelectorsWrapper;
