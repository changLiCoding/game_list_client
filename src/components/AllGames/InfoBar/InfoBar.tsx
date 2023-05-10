import { Layout } from 'antd';

import styles from '@/components/AllGames/InfoBar/InfoBar.module.scss';
import FilterTags from '@/components/AllGames/InfoBar/FilterTags';
import SelectorsWrapper from '@/components/AllGames/InfoBar/SelectorsWrapper';
import { OnChangeCascaderType } from '@/types/global';

export default function InfoBar({
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
  return (
    <Layout className={styles.infoBarContainer}>
      <FilterTags tagsArr={tagsArr} setTagsArr={setTagsArr} />
      <SelectorsWrapper />
    </Layout>
  );
}
