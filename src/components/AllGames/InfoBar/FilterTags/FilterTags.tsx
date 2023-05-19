import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';
import type { OnChangeCascaderType } from '@/types/global';
import type { FilterTagsType } from '@/components/AllGames/InfoBar/types';

function FilterTags({ tagsArr, setTagsArr }: FilterTagsType) {
  const handleClose = (removedTag: string | OnChangeCascaderType) => {
    const newTags = tagsArr.filter((tag) => tag.value !== removedTag);
    setTagsArr(newTags);
  };

  return (
    <div
      className={styles.tagsContainer}
      // TODO: FIX THIS WHEN THERE ARE NO TAGS IN THE ARRAY
      // style={{ display: `${tagsArr.length > 0 ? null : 'none'}` }}
    >
      {tagsArr.length > 0 && <TagsTwoTone className={styles.tagsIcon} />}
      {tagsArr &&
        tagsArr.map((tag) => (
          <Tag
            closable
            onClose={() => handleClose(tag.value)}
            key={tag.id}
            className={styles.tagsText}
          >
            {tag.value}
          </Tag>
        ))}
    </div>
  );
}

export default FilterTags;
