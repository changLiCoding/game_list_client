import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';
// import { reset, setFilters } from '@/features/gameFiltersSlice';
import { remove } from '@/utils/utils';
import { resetGameFilters, setGameFilters } from '@/app/store';

function FilterTags() {
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);
  const shouldRenderTags = Object.keys(gameFilters).some((e) => {
    const value = gameFilters[e as keyof typeof gameFilters];
    if (value) {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return true;
    }
    return false;
  });
  return (
    <div className={styles.tagsContainer}>
      {shouldRenderTags && (
        <>
          <TagsTwoTone className={styles.tagsIcon} />
          {gameFilters.genres &&
            gameFilters.genres.map((filter) => {
              return (
                <Tag
                  closable
                  onClose={() => {
                    if (!gameFilters.genres) return;
                    const removedFilter = remove(gameFilters.genres, filter);
                    dispatch(setGameFilters({ genres: removedFilter }));
                  }}
                  key={filter}
                  className={styles.tagsText}
                >
                  {filter}
                </Tag>
              );
            })}
          <Tag
            closable
            onClose={() => dispatch(resetGameFilters())}
            className={styles.clearAll}
          >
            Clear all
          </Tag>
        </>
      )}
    </div>
  );
}

export default FilterTags;
