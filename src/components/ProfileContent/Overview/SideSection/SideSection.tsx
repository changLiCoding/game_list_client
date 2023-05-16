import styles from '@/components/ProfileContent/Overview/SideSection/SideSection.module.scss';
import ListCards from '@/components/ProfileContent/Overview/SideSection/ListCards';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import type { UserGamesType } from '@/types/global';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function SideSection() {
  const { gamesByStatusForAUserLoading, gamesByStatusForAUser } =
    useGamesByStatus();
  const { gamesByStatusForAUser: gamesByStatus } = !gamesByStatusForAUserLoading
    ? gamesByStatusForAUser
    : { gamesByStatusForAUser: null };
  console.log(gamesByStatus, gamesByStatusForAUserLoading);

  const gamesExtractor = (gamesObjData: UserGamesType) => {
    const res: JSX.Element[] = [];

    gamesObjData.listsOrder.split(',').forEach((status) => {
      if (Array.isArray(gamesObjData[status]) && gamesObjData[status]) {
        const gameData: GameType[] | number | string | string[] =
          gamesObjData[status];
        if (Array.isArray(gameData) && gameData.length > 0) {
          res.push(<ListCards status={status} gameData={gameData} />);
        }
      }
    });

    return res;
  };

  return (
    <div className={styles.sideSectionContainer}>
      {gamesByStatusForAUserLoading && <div>Loading...</div>}
      {gamesByStatus &&
        !gamesByStatusForAUserLoading &&
        gamesExtractor(gamesByStatus)}
    </div>
  );
}

export default SideSection;
