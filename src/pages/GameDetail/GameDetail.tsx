import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import useNotification from '@/hooks/useNotification';
import useGetGameById from '@/services/game/useGetGameById';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import GameDetailHeader from '@/components/GameDetailHeader';
import { apolloClient } from '@/graphql';

function GameDetail(): JSX.Element {
  const { warning, contextHolder } = useNotification();
  const { id } = useParams();
  const {
    game: gameFromHook,
    getGame,
    error: errorFromHook,
  } = useGetGameById();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const memorizedGetGame = useCallback(getGame, []);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const memorizedWarning = useCallback(warning, []);
  const [game, setGame] = useState<GameType | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
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
              isGameLiked
            }
          `,
        });

        if (tempGame) {
          setGame(tempGame);
        } else {
          await getGame(id as string);
        }
      } catch (error) {
        if (error instanceof Error) {
          warning(error.message as string);
        }
      }
    };

    if (id) {
      fetchGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!game && !gameFromHook) {
    return (
      <Layout>
        <Content>
          <div>{errorFromHook?.message}</div>
        </Content>
      </Layout>
    );
  }

  return (
    (game || gameFromHook) && (
      <Layout>
        <Content>
          <GameDetailHeader game={game || gameFromHook} />
        </Content>
        {contextHolder}
      </Layout>
    )
  );
}

export default GameDetail;
