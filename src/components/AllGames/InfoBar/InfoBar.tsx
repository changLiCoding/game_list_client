import { Layout } from 'antd';

import styles from '@/components/AllGames/InfoBar/InfoBar.module.scss';
import FilterTags from '@/components/AllGames/InfoBar/FilterTags';
import SelectorsWrapper from '@/components/AllGames/InfoBar/SelectorsWrapper';
import type { OnChangeCascaderType } from '@/types/global';

export default function InfoBar({
  tagsArr,
  setTagsArr,
  isCardView,
  setIsCardView,
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
  isCardView: boolean;
  setIsCardView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Layout className={styles.infoBarContainer}>
      <FilterTags tagsArr={tagsArr} setTagsArr={setTagsArr} />
      <SelectorsWrapper setIsCardView={setIsCardView} isCardView={isCardView} />
    </Layout>
  );
}
