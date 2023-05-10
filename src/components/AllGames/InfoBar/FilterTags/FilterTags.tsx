import { TagsTwoTone } from '@ant-design/icons';

import styles from '@/components/AllGames/InfoBar/FilterTags/FilterTags.module.scss';

function FilterTags() {
  return (
    <div className={styles.tagsContainer}>
      <TagsTwoTone
        style={{
          fontSize: '1.5rem',
          transform: 'scale(-1) rotate(90deg)',
        }}
      />
    </div>
  );
}

export default FilterTags;
