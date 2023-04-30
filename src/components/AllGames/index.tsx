import { Layout } from 'antd';
import GamesList from './GamesList';
import InfoBar from './InfoBar';
import './AllGames.scss';

export default function AllGames() {
  return (
    <Layout className="Lagout-AllGames-container">
      <InfoBar />
      <GamesList />
    </Layout>
  );
}
