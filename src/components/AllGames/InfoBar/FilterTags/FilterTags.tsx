import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';
import { OnChangeCascaderType } from '@/types/global';
import { useAppSelector } from '@/app/hooks';
import { clearAll, removeFilter } from '@/features/homeSearchSlice';

function FilterTags({
  tagsArr,
  setTagsArr,
}: {
  setTagsArr: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string | OnChangeCascaderType;
      }[]
    >
  >;
  tagsArr: { id: string; value: string | number | OnChangeCascaderType }[];
}) {
  const handleClose = (removedTag: string | OnChangeCascaderType) => {
    const newTags = tagsArr.filter((tag) => tag.value !== removedTag);
    setTagsArr(newTags);
  };

  const dispatch = useDispatch();
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const filtersLength =
    homeSearchState.filters.genres.length +
    homeSearchState.filters.platforms.length +
    homeSearchState.filters.tags.length;
  return (
    <div className={styles.tagsContainer}>
      {filtersLength > 0 && (
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
          <Tag
            closable
            onClose={() => dispatch(clearAll())}
            className={styles.tagsText}
          >
            Clear all
          </Tag>
        </>
      )}
    </div>
  );
}

export default FilterTags;
