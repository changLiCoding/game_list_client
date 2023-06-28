import { Layout } from 'antd';
import GameDetailHeaderBanner from '@/components/GameDetailHeader/GameDetailHeaderBanner';
import GameDetailHeaderInfo from '@/components/GameDetailHeader/GameDetailHeaderInfo';
import type { GameDetailsType } from '@/components/GameDetailHeader/types';

function GameDetailHeader({ game, setGame }: GameDetailsType) {
  return (
    <Layout>
      <GameDetailHeaderBanner game={game} />
      <GameDetailHeaderInfo game={game} setGame={setGame} />
    </Layout>
  );
}

export default GameDetailHeader;
