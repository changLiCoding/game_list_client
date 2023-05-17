import { Layout } from 'antd';
import GameDetailHeaderBanner from '@/components/GameDetailHeader/GameDetailHeaderBanner';
import GameDetailHeaderInfo from '@/components/GameDetailHeader/GameDetailHeaderInfo';
import type { GameDetailsType } from '@/components/GameDetailHeader/types';

function GameDetailHeader({ game }: GameDetailsType) {
  return (
    <Layout>
      <GameDetailHeaderBanner game={game} />
      <GameDetailHeaderInfo game={game} />
    </Layout>
  );
}

export default GameDetailHeader;
