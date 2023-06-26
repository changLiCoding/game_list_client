import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';
import { remove } from '@/utils/utils';
import { resetGameFilter, resetGameFilters, setGameFilters } from '@/app/store';
import { HomeGameFilters } from '@/types/global';

function FilterTags() {
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);

  // TODO: Use a 'transformer' function to handle sortBy, excludedPlatforms, excludedTags and excludedGenres

  const filterTags = useMemo(() => {
    // Loop through all the keys and values of gameFilters and filter out the non null and undefined values
    const entries = Object.entries(gameFilters).filter((e) => {
      if (e && e[0] === 'sortBy') return false; // Don't show sortBy in the filter tags - Kind of a hack, but were only filtering out 1 key
      if (Array.isArray(e[1])) return e[1].length > 0;
      return e[1];
    });

    if (entries.length > 0)
      return (
        <>
          <TagsTwoTone className={styles.tagsIcon} />

          {entries.map(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map((filterValue) => {
                return (
                  <Tag
                    id={`tag-${key}`}
                    closable
                    onClose={() => {
                      const removedFilter = remove(value, filterValue);
                      dispatch(setGameFilters({ [key]: removedFilter }));
                    }}
                    key={`${key}-${filterValue}`}
                    className={styles.tagsText}
                  >
                    {/* Again were only checking for excludedGenres this time. Note: if we had to do this for a 3rd variable, 
                        this would probably move to a transformer type function to handle these scenarios */}
                    {key === 'excludedGenres' && <>-</>}
                    {filterValue}
                  </Tag>
                );
              });
            }
            return (
              <Tag
                id={`tag-${key}`}
                closable
                onClose={() => {
                  dispatch(resetGameFilter(key as keyof HomeGameFilters));
                }}
                key={value}
                className={styles.tagsText}
              >
                {value}
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
      );

    return <div />;
  }, [dispatch, gameFilters]);

  return <div className={styles.tagsContainer}>{filterTags}</div>;
}

export default FilterTags;
