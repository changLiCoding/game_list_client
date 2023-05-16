import styles from '@/components/ProfileContent/Overview/Overview.module.scss';
import SideSection from '@/components/ProfileContent/Overview/SideSection/SideSection';
import MainSection from '@/components/ProfileContent/Overview/MainSection/MainSection';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import type { UserGamesType } from '@/types/global';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function Overview() {
  const { gamesByStatusForAUserLoading, gamesByStatusForAUser } =
    useGamesByStatus();
  const { gamesByStatusForAUser: gamesByStatus } = !gamesByStatusForAUserLoading
    ? gamesByStatusForAUser
    : { gamesByStatusForAUser: null };

  return (
    <div className={styles.overview}>
      <SideSection
        gamesByStatusForAUserLoading={gamesByStatusForAUserLoading}
        gamesByStatus={gamesByStatus}
      />
      <MainSection
        gamesByStatusForAUserLoading={gamesByStatusForAUserLoading}
        gamesByStatus={gamesByStatus}
      />
    </div>
  );
}

export default Overview;
