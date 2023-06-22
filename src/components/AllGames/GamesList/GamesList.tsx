import { theme, Card, Row } from 'antd';
import { InView } from 'react-intersection-observer';
import { Content } from 'antd/es/layout/layout';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import GameCard from '@/components/AllGames/GamesList/GameCard';
import List from '@/components/AllGames/GamesList/List';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import useUserGameById from '@/services/userGames/useUserGameById';
import ListEditor from '@/components/ListEditor';
import type { GameDataType } from '@/components/GamesListTable/types';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { getTokenFromLocalStorage } from '@/constants';
import { store } from '@/app/store';
import { setAddedGames } from '@/features/addedGamesSlice';

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const gameFilters = useAppSelector((state) => state.gameFilters);
  const { addedList } = useAppSelector((state) => state.addedGames);
  const userState = useAppSelector((state) => state.user);

  const [tempSearch, setTempSearch] = useState<string | undefined>('');

  // States for modal to edit list
  const { userGameLoading, fetchUserGame } = useUserGameById();
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameDataType>();

  const dispatch = useAppDispatch();

  const { data, loading, fetchMore } = useQuery(GET_ALL_GAMES, {
    variables: {
      genre: gameFilters.genres,
      tag: gameFilters.tags,
      platform: gameFilters.platforms,
      year: gameFilters.year,
      sortBy: gameFilters.sortBy,
      search: tempSearch,
      limit: 20,
      offset: 0,
    },
    context: getTokenFromLocalStorage(),
    onCompleted: (games) => {
      const { allGames: allGamesData } = games;

      if (allGamesData) {
        allGamesData.forEach((game) => {
          if (
            userState.user.id &&
            game.isGameAdded &&
            !addedList.includes(game.id)
          ) {
            dispatch(
              setAddedGames({
                type: 'add',
                gameId: game.id,
              })
            );
          }
        });
      }
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(
    debounce((query: string | undefined) => {
      if (!query) {
        setTempSearch(undefined);
        return;
      }
      setTempSearch(query);
    }, 600),
    []
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { search } = store.getState().gameFilters;

      if (search === tempSearch) {
        return;
      }

      if (!search) {
        setTempSearch(undefined);
        debouncedFilter.cancel();
        return;
      }
      debouncedFilter(search);
    });

    return () => {
      debouncedFilter.cancel();
      unsubscribe();
    };
  }, [debouncedFilter, tempSearch]);

  const openGameListEditor = async (game: GameDataType) => {
    setSelectedGame(game);

    await fetchUserGame({ variables: { gameId: game.id } });
    setOpen(true);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // TODO: Add Loading component
  if (loading || !data) {
    return null;
  }

  return (
    <Content aria-label={`view-${homeSearchState.view}`}>
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
            {data &&
              data?.allGames.map((game) => (
                <GameCard
                  isAdded={addedList.includes(game.id)}
                  key={`grid-${game.id}`}
                  game={game}
                  colorBgContainer={colorBgContainer}
                  openGameListEditor={openGameListEditor}
                />
              ))}
            {data && (
              <InView
                style={{ visibility: 'hidden' }}
                onChange={async (inView) => {
                  const currentLength = data.allGames.length || 0;

                  if (inView) {
                    await fetchMore({
                      variables: {
                        limit: 20,
                        offset: currentLength,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...prev,
                          allGames: [
                            ...prev.allGames,
                            ...fetchMoreResult.allGames,
                          ],
                        };
                      },
                    });
                  }
                }}
              >
                INVIEW
              </InView>
            )}
          </Row>
        </Card>
      ) : (
        <div className={styles.allListContainer}>
          <div className={styles.allListTitle}>All Games</div>
          <div className={styles.allListDivider}>
            {data &&
              [...data.allGames].map((game) => (
                <List
                  key={`list-${game.id}`}
                  game={game}
                  colorBgContainer={colorBgContainer}
                />
              ))}
            {data && (
              <InView
                style={{ visibility: 'hidden' }}
                onChange={async (inView) => {
                  const currentLength = data.allGames.length || 0;

                  if (inView) {
                    await fetchMore({
                      variables: {
                        limit: 20,
                        offset: currentLength,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...prev,
                          allGames: [
                            ...prev.allGames,
                            ...fetchMoreResult.allGames,
                          ],
                        };
                      },
                    });
                  }
                }}
              >
                INVIEW
              </InView>
            )}
          </div>
        </div>
      )}
      <ListEditor
        userGameLoading={userGameLoading}
        open={open}
        setOpen={setOpen}
        game={selectedGame as GameDataType}
        isGameAdded={addedList.includes(selectedGame?.id as string)}
      />
    </Content>
  );
}
