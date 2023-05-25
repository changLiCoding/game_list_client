import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';
import { clearAll, removeFilter } from '@/features/homeSearchSlice';

function FilterTags() {
  const dispatch = useDispatch();
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const shouldRenderTags =
    homeSearchState.filters.genres.length +
      homeSearchState.filters.platforms.length +
      homeSearchState.filters.tags.length >
      0 || homeSearchState.filters.year > 0;
  return (
    <div className={styles.tagsContainer}>
      {shouldRenderTags && (
        <>
          {' '}
          <TagsTwoTone className={styles.tagsIcon} />
          {homeSearchState.filters.genres.map((filter) => {
            return (
              <Tag
                closable
                onClose={() =>
                  dispatch(removeFilter({ type: 'Genre', value: filter }))
                }
                key={filter}
                className={styles.tagsText}
              >
                {filter}
              </Tag>
            );
          })}
          {homeSearchState.filters.platforms.map((filter) => {
            return (
              <Tag
                closable
                onClose={() =>
                  dispatch(removeFilter({ type: 'Platform', value: filter }))
                }
                key={filter}
                className={styles.tagsText}
              >
                {filter}
              </Tag>
            );
          })}
          {homeSearchState.filters.tags.map((filter) => {
            return (
              <Tag
                closable
                onClose={() =>
                  dispatch(removeFilter({ type: 'Tag', value: filter }))
                }
                key={filter}
                className={styles.tagsText}
              >
                {filter}
              </Tag>
            );
          })}
          {homeSearchState.filters.year > 0 && (
            <Tag
              closable
              onClose={() => dispatch(removeFilter({ type: 'Year' }))}
              key={homeSearchState.filters.year}
              className={styles.tagsText}
            >
              {homeSearchState.filters.year}
            </Tag>
          )}
          <Tag
            closable
            onClose={() => dispatch(clearAll())}
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
