import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import useGetGameById from '@/services/game/useGetGameById';

import GameDetailHeader from '@/components/GameDetailHeader';
import { apolloClient } from '@/graphql';

function GameDetail() {
  const { id } = useParams();
  const { game: gameFromHook, getGame } = useGetGameById();

  const tempGame = apolloClient.readFragment({
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

  const [game, setGame] = useState(tempGame);
  useEffect(() => {
    const loadGame = async (newGame: string) => {
      await getGame(newGame);
    };
    if (!tempGame) {
      loadGame(id as string);
    }
  }, [id, getGame, tempGame]);

  useEffect(() => {
    setGame(gameFromHook);
  }, [gameFromHook]);

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
