import { Layout } from 'antd';
import GamesList from '@/components/AllGames/GamesList';
import InfoBar from '@/components/AllGames/InfoBar';
import styles from '@/components/AllGames/AllGames.module.scss';
import type { AllGamesType } from '@/components/AllGames/types';

export default function AllGames({
  tagsArr,
  setTagsArr,
  isCardView,
  setIsCardView,
}: AllGamesType) {
  return (
    <Layout
      className={`${styles.layoutAllGamesContainer} ${
        !isCardView ? styles.layoutAllListsContainer : null
      }`}
    >
      <InfoBar
        tagsArr={tagsArr}
        setTagsArr={setTagsArr}
        isCardView={isCardView}
        setIsCardView={setIsCardView}
      />
      <GamesList isCardView={isCardView} />
    </Layout>
  );
}
