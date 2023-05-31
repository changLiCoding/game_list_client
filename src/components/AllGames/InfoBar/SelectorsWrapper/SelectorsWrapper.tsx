import { AppstoreFilled, UnorderedListOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import styles from '@/components/AllGames/InfoBar/SelectorsWrapper/SelectorsWrapper.module.scss';
import { useAppSelector } from '@/app/hooks';
import { setView } from '@/features/homeSearchSlice';
import { setGameFilters } from '@/app/store';
import { GameFiltersSortType } from '@/types/global';

type SortItemsListType = {
  label: string;
  value: GameFiltersSortType | undefined;
};

function SelectorsWrapper() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const gameFilters = useAppSelector((state) => state.gameFilters);
  const dispatch = useDispatch();

  const sortItemsList: SortItemsListType[] = useMemo(() => {
    return [
      { label: 'Name', value: 'name' },
      { label: 'Average Score', value: 'avg_score' },
      { label: 'Newest Releases', value: 'newest_releases' },
      { label: 'Oldest Releases', value: 'oldest_releases' },
      { label: 'Total Ratings', value: 'total_rating' },
    ];
  }, []);

  return (
    <div className={styles.selectorsContainer}>
      <Select
        style={{ width: 150 }}
        defaultValue="name"
        bordered={false}
        value={gameFilters.sortBy}
        options={sortItemsList}
        onChange={(value: SortItemsListType['value']) => {
          dispatch(setGameFilters({ sortBy: value }));
        }}
      />
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
