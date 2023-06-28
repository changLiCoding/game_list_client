import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import useNotification from '@/hooks/useNotification';
import useGetGameById from '@/services/game/useGetGameById';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import type { GameDataType } from '@/components/GamesListTable/types';
import GameDetailHeader from '@/components/GameDetailHeader';

function GameDetail(): JSX.Element {
  const { warning, contextHolder } = useNotification();
  const { id } = useParams();
  const {
    game: gameFromHook,
    getGame,
    error: errorFromHook,
    getGameFromFragment,
  } = useGetGameById();
  const [game, setGame] = useState<GameType | null | undefined | GameDataType>(
    null
  );

  useEffect(() => {
    const tempGame: GameType | null = getGameFromFragment(id as string);
    const fetchGame = async () => {
      try {
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
    <Layout>
      <Content>
        <GameDetailHeader game={game || gameFromHook} setGame={setGame} />
      </Content>
      {contextHolder}
    </Layout>
  );
}

export default GameDetail;
