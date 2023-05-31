import styles from '@/components/ProfileContent/Overview/SideSection/SideSection.module.scss';
import ListCards from '@/components/ProfileContent/Overview/SideSection/ListCards';
import type { UserGamesByStatus } from '@/graphql/__generated__/graphql';

function SideSection({
  gamesByStatusForAUserLoading,
  gamesByStatus,
}: {
  gamesByStatusForAUserLoading: boolean;
  gamesByStatus?: UserGamesByStatus;
}) {
  gamesByStatus && console.log(gamesByStatus);

  const gamesExtractor = (gamesObjData: UserGamesByStatus) => {
    const res: JSX.Element[] = [];

    gamesObjData?.listsOrder?.split(',').forEach((status: string) => {
      const gameData =
        gamesObjData[
          status as 'playing' | 'completed' | 'paused' | 'dropped' | 'planning'
        ];

      if (gameData && gameData.length > 0) {
        res.push(
          <ListCards
            key={gameData[0].name}
            status={status}
            gameData={gameData}
          />
        );
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
