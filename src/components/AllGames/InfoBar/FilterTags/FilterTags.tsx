import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';

import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

function FilterTags() {
  const log = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
  };
  return (
    <div className={styles.tagsContainer}>
      <TagsTwoTone className={styles.tagsIcon} />
      <Tag closable onClose={log} className={styles.tagsText}>
        Dark Souls
      </Tag>
      <Tag closable onClose={log} className={styles.tagsText}>
        Dark Souls
      </Tag>
      <Tag closable onClose={log} className={styles.tagsText}>
        Dark Souls
      </Tag>
      <Tag closable onClose={log} className={styles.tagsText}>
        Dark Souls
      </Tag>
    </div>
  );
}

export default FilterTags;
