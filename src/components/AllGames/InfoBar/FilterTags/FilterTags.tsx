import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';
import { OnChangeCascaderType } from '@/types/global';

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
    console.log('Tag got removed', removedTag);

    const newTags = tagsArr.filter((tag) => tag.value !== removedTag);
    console.log('NeWTAGS', newTags);
    setTagsArr(newTags);
  };
  console.log(tagsArr);

  return (
    <div className={styles.tagsContainer}>
      <TagsTwoTone className={styles.tagsIcon} />
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
