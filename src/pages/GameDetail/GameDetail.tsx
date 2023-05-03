import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { Game as GameType } from '@/graphql/__generated__/graphql';
import useAllGames from '@/services/games/useAllGames';
import GameDetailHeader from '@/components/GameDetailHeader';

// import { useAppSelector } from '@/app/hooks';

function GameDetail() {
  const { id, name } = useParams();
  const {
    games: gamesState,
    loading,
  }: { games: GameType[] | undefined; loading: boolean } = useAllGames();
  // const gamesState = useAppSelector((state) => state.games);
  if (loading) return <div>Loading...</div>;

  const game: GameType | undefined = gamesState?.find(
    (gameEle: GameType) => gameEle.id === id
  );

  return (
    <Layout>
      <Content>
        <GameDetailHeader game={game} />
      </Content>
    </Layout>
  );
}

export default GameDetail;
