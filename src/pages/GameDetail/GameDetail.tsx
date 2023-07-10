import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import useAllGames from '@/services/games/useAllGames';
import GameDetailHeader from '@/components/GameDetailHeader';

function GameDetail() {
  const { id } = useParams();
  const {
    games: gamesState,
    loading,
  }: { games: GameType[]; loading: boolean } = useAllGames();

  if (loading) return <div>Loading...</div>;

  const game = gamesState.find((gameEle: GameType) => gameEle.id === id);

  return game !== undefined ? (
    <Layout>
      <Content>
        <GameDetailHeader game={game} />
      </Content>
    </Layout>
  ) : (
    <Layout>
      <Content>
        <div>Game not found</div>
      </Content>
    </Layout>
  );
}

export default GameDetail;
