import { Layout } from 'antd';
import GamesList from '@/components/AllGames/GamesList';
import InfoBar from '@/components/AllGames/InfoBar';
import styles from '@/components/AllGames/AllGames.module.scss';

export default function AllGames() {
  return (
    <Layout className={styles.layoutAllGamesContainer}>
      <InfoBar />
      <GamesList />
    </Layout>
  );
}
