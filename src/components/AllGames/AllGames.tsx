import { Layout } from 'antd';
import GamesList from './GamesList';
import InfoBar from './InfoBar';
import styles from './AllGames.module.scss';

export default function AllGames() {
  return (
    <Layout className={styles.layoutAllGamesContainer}>
      <InfoBar />
      <GamesList />
    </Layout>
  );
}
