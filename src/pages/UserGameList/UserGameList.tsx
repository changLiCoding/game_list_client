import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import styles from './UserGameListStyle.module.scss';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import FilterColumn from '@/components/UserListFilterColumn';
import UserGamesTable from '@/components/GamesListTable';
import { useAppSelector } from '@/app/hooks';
import type { Game } from '@/graphql/__generated__/graphql';
import { setInitialState } from '@/features/userGamesListSlice';

function UserGameList() {
  const dispatch = useDispatch();
  const selectedList = useAppSelector(
    (state) => state.userGameFilters.selectedList
  );
  const listOrder = useAppSelector((state) => state.userGames.listOrder);
  const { gamesByStatusForAUserLoading, gamesByStatusForAUser } =
    useGamesByStatus();

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

  if (gamesByStatusForAUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <FilterColumn />
      <div>
        {selectedList === 'all' ? (
          listOrder.map((list) => {
            return (
              <UserGamesTable
                key={list}
                gamesData={
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  gamesByStatusForAUser?.gamesByStatusForAUser[list] as Game[]
                }
                title={list[0].toUpperCase() + list.slice(1)}
              />
            );
          })
        ) : (
          <UserGamesTable
            key={selectedList}
            gamesData={
              gamesByStatusForAUser?.gamesByStatusForAUser[
                selectedList
              ] as Game[]
            }
            title={selectedList[0].toUpperCase() + selectedList.slice(1)}
          />
        )}
      </div>
    </div>
  );
}

export default UserGameList;
