import { Layout } from 'antd';
import GamesList from '@/components/AllGames/GamesList';
import InfoBar from '@/components/AllGames/InfoBar';
import styles from '@/components/AllGames/AllGames.module.scss';
import { OnChangeCascaderType } from '@/types/global';

export default function AllGames({
  tagsArr,
}: {
  tagsArr: { id: string; value: string | OnChangeCascaderType }[];
}) {
  return (
    <Layout className={styles.layoutAllGamesContainer}>
      <InfoBar tagsArr={tagsArr} />
      <GamesList />
    </Layout>
  );
}
