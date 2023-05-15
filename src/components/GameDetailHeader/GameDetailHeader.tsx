import { Layout } from 'antd';

import { Game as GameType } from '@/graphql/__generated__/graphql';
import GameDetailHeaderBanner from '@/components/GameDetailHeader/GameDetailHeaderBanner';
import GameDetailHeaderInfo from '@/components/GameDetailHeader/GameDetailHeaderInfo';

function GameDetailHeader({ game }: { game: GameType }) {
  return (
    <Layout>
      <GameDetailHeaderBanner game={game} />
      <GameDetailHeaderInfo game={game} />
    </Layout>
  );
}

export default GameDetailHeader;
