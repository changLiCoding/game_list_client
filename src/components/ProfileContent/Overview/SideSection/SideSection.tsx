import styles from '@/components/ProfileContent/Overview/SideSection/SideSection.module.scss';
import ListCards from '@/components/ProfileContent/Overview/SideSection/ListCards';
import type { UserGamesType } from '@/types/global';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function SideSection({
  gamesByStatusForAUserLoading,
  gamesByStatus,
}: {
  gamesByStatusForAUserLoading: boolean;
  gamesByStatus?: UserGamesType;
}) {
  const gamesExtractor = (gamesObjData: UserGamesType) => {
    const res: JSX.Element[] = [];

    gamesObjData.listsOrder.split(',').forEach((status) => {
      if (Array.isArray(gamesObjData[status]) && gamesObjData[status]) {
        const gameData = gamesObjData[status];
        if (
          Array.isArray(gameData) &&
          gameData.length > 0 &&
          typeof gameData[0] !== 'string'
        ) {
          const games: GameType[] = gameData;
          res.push(
            <ListCards
              key={gameData[0].name}
              status={status}
              gameData={games}
            />
          );
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
