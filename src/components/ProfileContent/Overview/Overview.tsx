import { useEffect } from 'react';
import styles from '@/components/ProfileContent/Overview/Overview.module.scss';
import { useAppSelector } from '@/app/hooks';
import SideSection from '@/components/ProfileContent/Overview/SideSection/SideSection';
import MainSection from '@/components/ProfileContent/Overview/MainSection/MainSection';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';

function Overview() {
  const {
    getGamesByStatusForAUser,
    gamesByStatusForAUserLoading,
    gamesByStatusForAUser,
    refetch,
  } = useGamesByStatus();

  const { addedList } = useAppSelector((state) => state.addedGames);

  useEffect(() => {
    if (getGamesByStatusForAUser) {
      getGamesByStatusForAUser();
    }
  }, [getGamesByStatusForAUser]);

  // useEffect(() => {
  //   refetch();
  // }, [addedList, refetch]);

  if (gamesByStatusForAUserLoading || !gamesByStatusForAUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.overview}>
      <SideSection
        gamesByStatusForAUserLoading={gamesByStatusForAUserLoading}
        gamesByStatus={gamesByStatusForAUser.gamesByStatusForAUser}
      />
      <MainSection
        gamesByStatusForAUserLoading={gamesByStatusForAUserLoading}
        gamesByStatus={gamesByStatusForAUser.gamesByStatusForAUser}
      />
    </div>
  );
}

export default Overview;
