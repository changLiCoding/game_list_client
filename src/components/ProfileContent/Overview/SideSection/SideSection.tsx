import styles from '@/components/ProfileContent/Overview/SideSection/SideSection.module.scss';
import ListCards from '@/components/ProfileContent/Overview/SideSection/ListCards';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import type {
  // UserGamesByStatus as UserGamesType,
  Game as GameType,
} from '@/graphql/__generated__/graphql';

function SideSection() {
  const { gamesByStatusForAUserLoading, gamesByStatusForAUser } =
    useGamesByStatus();
  const { gamesByStatusForAUser: gamesByStatus } = !gamesByStatusForAUserLoading
    ? gamesByStatusForAUser
    : { gamesByStatusForAUser: null };
  console.log(gamesByStatus, gamesByStatusForAUserLoading);

  // type UserGamesByStatus = {
  //   [status: string]: GameType[] | number | string;
  // };

  type UserGamesType = {
    [key: string]: GameType[] | number | string;
  };

  const gamesExtractor = (gamesObjData: UserGamesType) => {
    const res: JSX.Element[] = [];
    Object.keys(gamesObjData).forEach((key) => {
      const gameStatusData: GameType[] | number | string = gamesObjData[key];

      if (
        gameStatusData &&
        Array.isArray(gameStatusData) &&
        gameStatusData.length > 0
      ) {
        const gameData: GameType[] | number | string = gamesObjData[key];
        console.log(gameData);

        res.push(<ListCards status={key} gameData={gameData} />);
      }
    });
    return res;
  };

  if (!gamesByStatusForAUserLoading && gamesByStatus !== undefined) {
    gamesExtractor(gamesByStatus);
  }

  return (
    <div className={styles.sideSectionContainer}>
      SideSection
      {gamesByStatusForAUserLoading && <div>Loading...</div>}
      {gamesByStatus?.playing && (
        <ListCards status="Playing" gameData={gamesByStatus?.playing} />
      )}
      {gamesByStatus &&
        !gamesByStatusForAUserLoading &&
        gamesExtractor(gamesByStatus)}
    </div>
  );
}

export default SideSection;
