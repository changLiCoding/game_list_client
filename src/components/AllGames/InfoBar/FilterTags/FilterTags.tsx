import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

import { useAppSelector } from '@/app/hooks';
// import { removeFilter, reset } from '@/features/gameFiltersSlice';
// import { clearAll, removeFilter } from '@/features/homeSearchSlice';

function FilterTags() {
  const dispatch = useDispatch();
  const homeSearchState = useAppSelector((state) => state.gameFilters);
  const shouldRenderTags = false;
  return (
    <div className={styles.tagsContainer}>
      {shouldRenderTags && (
        <>
          <TagsTwoTone className={styles.tagsIcon} />
          {/* {homeSearchState.genres.map((filter) => {
            return (
              <Tag
                closable
                onClose={() => {
                  console.log('onClose - ', filter);
                  dispatch(removeFilter({ key: 'genres', value: filter }));
                }}
                key={filter}
                className={styles.tagsText}
              >
                {filter}
              </Tag>
            );
          })} */}
          {/* {homeSearchState.filters.platforms.map((filter) => {
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
          )} */}
          {/* <Tag
            closable
            onClose={() => dispatch(reset())}
            className={styles.clearAll}
          >
            Clear all
          </Tag> */}
        </>
      )}
    </div>
  );
}

export default FilterTags;
