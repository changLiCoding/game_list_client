import { Layout } from 'antd';
import styles from '@/components/AllGames/InfoBar/InfoBar.module.scss';
import FilterTags from '@/components/AllGames/InfoBar/FilterTags';
import SelectorsWrapper from '@/components/AllGames/InfoBar/SelectorsWrapper';
import { AllGamesType } from '@/components/AllGames/types';

export default function InfoBar({
  tagsArr,
  setTagsArr,
  isCardView,
  setIsCardView,
}: AllGamesType) {
  return (
    <Layout className={styles.infoBarContainer}>
      <FilterTags tagsArr={tagsArr} setTagsArr={setTagsArr} />
      <SelectorsWrapper setIsCardView={setIsCardView} isCardView={isCardView} />
    </Layout>
  );
}
