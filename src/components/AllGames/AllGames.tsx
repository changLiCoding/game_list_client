import { Layout } from 'antd';
import GamesList from '@/components/AllGames/GamesList';
import InfoBar from '@/components/AllGames/InfoBar';

export default function AllGames() {
  return (
    <Layout>
      <InfoBar />
      <GamesList />
    </Layout>
  );
}
