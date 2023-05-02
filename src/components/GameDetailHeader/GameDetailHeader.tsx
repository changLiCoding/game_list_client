import { Layout } from 'antd';

import { Game as GameType } from '@/graphql/__generated__/graphql';
import GameDetailHeaderBanner from '@/components/GameDetailHeader/GameDetailHeaderBanner';
import GameDetailHeaderInfo from './GameDetailHeaderInfo/GameDetailHeaderInfo';

function GameDetailHeader({ game }: { game: GameType | undefined }) {
  return (
    <Layout>
      <GameDetailHeaderBanner game={game} />
      <GameDetailHeaderInfo game={game} />
    </Layout>
  );
}

export default GameDetailHeader;
