import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import useAllGames from '@/services/games/useAllGames';
import { GET_ALL_GAMES } from '@/services/games/queries';
import GameDetailHeader from '@/components/GameDetailHeader';
import { apolloClient } from '@/graphql';

function GameDetail() {
  const { id } = useParams();

  const game: GameType | null = apolloClient.readFragment({
    id: `Game:${id}`,
    fragment: gql`
      fragment GetAllGames on Game {
        id
        name
        description
        bannerURL
        imageURL
        releaseDate
        avgScore
        totalRating
        genres
        tags
        platforms
        isGameAdded
      }
    `,
  });
  console.log(id, game);

  // const game = gamesState.find((gameEle: GameType) => gameEle.id === id);

  return game ? (
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
