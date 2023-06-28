import { theme, Card, Row } from 'antd';
import { InView } from 'react-intersection-observer';
import { Content } from 'antd/es/layout/layout';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import GameCard from '@/components/AllGames/GamesList/GameCard';
import List from '@/components/AllGames/GamesList/List';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import { useAppSelector } from '@/app/hooks';
import useUserGameById from '@/services/userGames/useUserGameById';
import ListEditor from '@/components/ListEditor';
import type { GameDataType } from '@/components/GamesListTable/types';
import { store } from '@/app/store';
import useAllGames from '@/services/games/useAllGames';
import { Game } from '@/graphql/__generated__/graphql';

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const { addedList } = useAppSelector((state) => state.addedGames);

  // States for modal to edit list
  const { userGameLoading, fetchUserGame } = useUserGameById();
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<
    GameDataType | null | Game
  >();

  const { games, loading, fetchMore, tempSearch, setTempSearch } =
    useAllGames();

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
        debouncedFilter.cancel();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter, tempSearch]);

  const memorizedOpenGameListEditor = useCallback(
    async (game: GameDataType) => {
      setSelectedGame(game);
      await fetchUserGame({ variables: { gameId: game.id } });
      setOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onFetchMore = async (cardsLength: number) => {
    await fetchMore({
      variables: {
        limit: 20,
        offset: cardsLength,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          allGames: [...prev.allGames, ...fetchMoreResult.allGames],
        };
      },
    });
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // TODO: Add Loading component
  if (loading || games.length === 0) {
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
            {games.length > 0
              ? games.map((game) => {
                  return (
                    <GameCard
                      isAdded={addedList.includes(game.id)}
                      key={`grid-${game.id}`}
                      game={game}
                      colorBgContainer={colorBgContainer}
                      openGameListEditor={memorizedOpenGameListEditor}
                    />
                  );
                })
              : null}
            {games.length > 0 ? (
              <InView
                style={{ visibility: 'hidden' }}
                onChange={async (inView) => {
                  const currentLength = games.length || 0;

                  if (inView) {
                    await onFetchMore(currentLength);
                  }
                }}
              >
                INVIEW
              </InView>
            ) : null}
          </Row>
        </Card>
      ) : (
        <div className={styles.allListContainer}>
          <div className={styles.allListTitle}>All Games</div>
          <div className={styles.allListDivider}>
            {games.length > 0
              ? games.map((game) => (
                  <List
                    key={`list-${game.id}`}
                    game={game}
                    colorBgContainer={colorBgContainer}
                  />
                ))
              : null}
            {games.length > 0 ? (
              <InView
                style={{ visibility: 'hidden' }}
                onChange={async (inView) => {
                  const currentLength = games.length || 0;

                  if (inView) {
                    await onFetchMore(currentLength);
                  }
                }}
              >
                INVIEW
              </InView>
            ) : null}
          </div>
        </div>
      )}
      <ListEditor
        userGameLoading={userGameLoading}
        open={open}
        setOpen={setOpen}
        game={selectedGame as GameDataType}
        isGameAdded={addedList.includes(selectedGame?.id as string)}
        setSelectedGame={setSelectedGame}
      />
    </Content>
  );
}
