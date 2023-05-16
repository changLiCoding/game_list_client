import { Layout } from 'antd';
import GamesList from '@/components/AllGames/GamesList';
import InfoBar from '@/components/AllGames/InfoBar';
import styles from '@/components/AllGames/AllGames.module.scss';
import type { OnChangeCascaderType } from '@/types/global';

export default function AllGames({
  tagsArr,
  setTagsArr,
  isCardView,
  setIsCardView,
}: {
  tagsArr: { id: string; value: string | OnChangeCascaderType }[];
  setTagsArr: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string | OnChangeCascaderType;
      }[]
    >
  >;
  isCardView: boolean;
  setIsCardView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
