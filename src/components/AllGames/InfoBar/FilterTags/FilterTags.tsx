import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';
import { OnChangeCascaderType } from '@/types/global';

function FilterTags({
  tagsArr,
}: {
  tagsArr: { id: string; value: string | number | OnChangeCascaderType }[];
}) {
  const log = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
  };
  console.log(tagsArr);

  return (
    <div className={styles.tagsContainer}>
      <TagsTwoTone className={styles.tagsIcon} />
      {tagsArr &&
        tagsArr.map((tag) => (
          <Tag closable onClose={log} key={tag.id} className={styles.tagsText}>
            {tag.value}
          </Tag>
        ))}
    </div>
  );
}

export default FilterTags;
