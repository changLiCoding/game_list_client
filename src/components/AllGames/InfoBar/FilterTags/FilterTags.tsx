import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';
import { remove } from '@/utils/utils';
import { resetGameFilters, setGameFilters } from '@/app/store';

function FilterTags() {
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);

  const filterTags = useMemo(() => {
    const keys = Object.keys(gameFilters).filter((e) => e);
    const shouldRenderTags = keys.some((e) => {
      const value = gameFilters[e as keyof typeof gameFilters];
      if (value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return true;
      }
      return false;
    });

    if (shouldRenderTags)
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />
          {keys.map((key) => {
            let filter = gameFilters[key as keyof typeof gameFilters];
            if (filter && !Array.isArray(filter)) {
              filter = Array.of(filter);
            }
            return (
              filter &&
              filter.map((filterValue) => {
                return (
                  <Tag
                    closable
                    onClose={() => {
                      if (!filter) return;
                      const removedFilter = remove(filter, filterValue);
                      dispatch(setGameFilters({ [key]: removedFilter }));
                    }}
                    key={filterValue}
                    className={styles.tagsText}
                  >
                    {filterValue}
                  </Tag>
                );
              })
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
      );

    return <div />;
  }, [dispatch, gameFilters]);

  return (
    <div className={styles.tagsContainer}>
      {filterTags}
      {/* {shouldRenderTags && (
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
      )} */}
    </div>
  );
}

export default FilterTags;
