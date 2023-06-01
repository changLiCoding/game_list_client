import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './UserGameListStyle.module.scss';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import FilterColumn from '@/components/UserListFilterColumn';
import UserGamesTable from '@/components/GamesListTable';
import { useAppSelector } from '@/app/hooks';
import { setInitialState } from '@/features/userUserGamesListSlice';
import type { Game } from '@/graphql/__generated__/graphql';

function UserGameList() {
  const dispatch = useDispatch();
  const selectedLists = useAppSelector(
    (state) => state.userGames.selectedLists
  );
  const {
    getGamesByStatusForAUser,
    gamesByStatusForAUserLoading,
    gamesByStatusForAUser,
  } = useGamesByStatus();

  useEffect(() => {
    if (getGamesByStatusForAUser) {
      getGamesByStatusForAUser();
    }
  }, [getGamesByStatusForAUser]);

  // Initialize the listsOrder, selectedLists, and localListOrder in redux toolkit
  useEffect(() => {
    if (gamesByStatusForAUser?.gamesByStatusForAUser?.listsOrder) {
      dispatch(
        setInitialState(
          gamesByStatusForAUser?.gamesByStatusForAUser?.listsOrder.split(',')
        )
      );
    }
  }, [dispatch, gamesByStatusForAUser?.gamesByStatusForAUser?.listsOrder]);

  if (gamesByStatusForAUserLoading || !gamesByStatusForAUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <FilterColumn />
      <div>
        {selectedLists.map((list) => {
          return (
            <UserGamesTable
              key={list}
              gamesData={
                gamesByStatusForAUser?.gamesByStatusForAUser[
                  list as
                    | 'playing'
                    | 'completed'
                    | 'dropped'
                    | 'paused'
                    | 'planning'
                ] as Game[]
              }
              title={list[0].toUpperCase() + list.slice(1)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserGameList;
