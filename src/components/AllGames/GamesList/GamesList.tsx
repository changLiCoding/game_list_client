import { theme, Card, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { debounce, set } from 'lodash';
import GameCard from '@/components/AllGames/GamesList/GameCard';
import List from '@/components/AllGames/GamesList/List';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import { useAppSelector } from '@/app/hooks';
import useUserGameById from '@/services/userGames/useUserGameById';
import ListEditor from '@/components/ListEditor';
import type { GameDataType } from '@/components/GamesListTable/types';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { getTokenFromLocalStorage } from '@/constants';
import { store } from '@/app/store';

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const gameFilters = useAppSelector((state) => state.gameFilters);

  const [tempSearch, setTempSearch] = useState<string | undefined>('');

  // States for modal to edit list
  const { userGameLoading, fetchUserGame } = useUserGameById();
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameDataType>();

  // console.log('gameFilters', gameFilters);
  // const [loadGreeting, { called, loading, data }] = useLazyQuery(
  //   GET_GREETING,
  //   { variables: { language: "english" } }
  // );
  const { data, loading } = useQuery(GET_ALL_GAMES, {
    variables: {
      genre: gameFilters.genres,
      tag: gameFilters.tags,
      platform: gameFilters.platforms,
      year: gameFilters.year,
      sortBy: gameFilters.sortBy,
      search: tempSearch,
    },
    ...getTokenFromLocalStorage,
  });

  const debouncedFilter = useCallback(
    debounce((query: string | undefined) => {
      console.log('called debouncedFilter ', query);
      setTempSearch(query);
    }, 500),
    []
  );

  // console.log('tempSearch', tempSearch);

  // const debouncedChangeHandler = useMemo(
  //   () =>
  //     debounce(() => console.log('called onChange ', gameFilters.search), 1000),
  //   [gameFilters.search]
  // );

  // useEffect(() => {
  //   // console.log('test: = ', gameFilters.search);
  //   debouncedChangeHandler();
  // }, [gameFilters.search]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      console.log(
        'Called useEffect (in subscribe) = ',
        store.getState().gameFilters.search
      );
      debouncedFilter(store.getState().gameFilters.search);
      // setTempSearch(store.getState().gameFilters.search);
    });

    return () => {
      console.log('Called useEffect unsub');
      unsubscribe();
    };
  }, [debouncedFilter]);

  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
    };
  }, [debouncedFilter]);

  // useEffect(() => {
  //   console.log('Called useEffect = ', gameFilters.search);
  //   debouncedChangeHandler();
  // }, [gameFilters.search]);

  const { addedList } = useAppSelector((state) => state.addedGames);

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
            {data?.allGames.map((game) => (
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
            {[...data.allGames]
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
      />
    </Content>
  );
}
