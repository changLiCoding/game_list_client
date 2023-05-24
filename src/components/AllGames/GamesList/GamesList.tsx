import { theme, Card, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GameCard from '@/components/AllGames/GamesList/GameCard';
import List from '@/components/AllGames/GamesList/List';
import useAllGames from '@/services/games/useAllGames';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import { useAppSelector } from '@/app/hooks';
import useUserGameById from '@/services/userGames/useUserGameById';
// import { setUserGameAdded } from '@/features/userGameSlice';
import ListEditor from '@/components/ListEditor';
import type { GameDataType } from '@/components/GamesListTable/types';

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const { games, refetch } = useAllGames(
    homeSearchState.filters.genres,
    homeSearchState.filters.tags,
    homeSearchState.filters.platforms,
    homeSearchState.filters.year
  );

  const dispatch = useDispatch();

  // States for modal to edit list
  const { userGameLoading, fetchUserGame } = useUserGameById();
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameDataType>();

  const { addedList } = useAppSelector((state) => state.addedGames);

  const openGameListEditor = async (game: GameDataType) => {
    setSelectedGame(game);
    // dispatch(
    //   setUserGameAdded({
    //     type: 'remove',
    //   })
    // );
    await fetchUserGame({ variables: { gameId: game.id } });
    setOpen(true);
  };

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch, homeSearchState.filters]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content>
      {homeSearchState.view === 'grid' ? (
        <Card title="All Games" headStyle={{ color: 'rgb(100, 115,128)' }}>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              xl: 32,
            }}
          >
            {games.map((game) => (
              <GameCard
                isAdded={addedList.includes(game.id)}
                key={`grid-${game.id}`}
                game={game}
                colorBgContainer={colorBgContainer}
                openGameListEditor={openGameListEditor}
              />
            ))}
          </Row>
        </Card>
      ) : (
        <div className={styles.allListContainer}>
          <div className={styles.allListTitle}>All Games</div>
          <div className={styles.allListDivider}>
            {[...games]
              .sort((a, b) => {
                return parseInt(a.id, 10) - parseInt(b.id, 10);
              })
              .map((game) => (
                <List
                  key={`list-${game.id}`}
                  game={game}
                  colorBgContainer={colorBgContainer}
                />
              ))}
          </div>
        </div>
      )}
      <ListEditor
        userGameLoading={userGameLoading}
        open={open}
        setOpen={setOpen}
        game={selectedGame as GameDataType}
        isGameAdded={addedList.includes(selectedGame?.id as string)}
        setGame={setSelectedGame}
      />
    </Content>
  );
}
