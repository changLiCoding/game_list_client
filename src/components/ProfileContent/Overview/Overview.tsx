import { useEffect } from 'react';
import styles from '@/components/ProfileContent/Overview/Overview.module.scss';
import { useAppSelector } from '@/app/hooks';
import SideSection from '@/components/ProfileContent/Overview/SideSection/SideSection';
import MainSection from '@/components/ProfileContent/Overview/MainSection/MainSection';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import useAuth from '@/services/authentication/useAuth';

function Overview() {
  const {
    getGamesByStatusForAUser,
    gamesByStatusForAUserLoading,
    gamesByStatusForAUser,
    refetch,
  } = useGamesByStatus();

  const { addedList } = useAppSelector((state) => state.addedGames);

  const { isLoginLoading, isRegisterLoading } = useAuth();

  // console.log('isLoginLoading', isLoginLoading);

  useEffect(() => {
    if (getGamesByStatusForAUser) {
      getGamesByStatusForAUser();
    }
  }, [getGamesByStatusForAUser]);

  useEffect(() => {
    refetch();
  }, [addedList, refetch]);

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
