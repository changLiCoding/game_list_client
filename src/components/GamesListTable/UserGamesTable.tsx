import UserGameListDesktop from './Desktop';
import UserGameListMobile from './Mobile';
import styles from './UserGamesTable.module.scss';
import type { GameDataType } from './types';

function UserGamesTable({
  gamesData,
  title,
}: {
  gamesData: GameDataType[];
  title: string;
}) {
  return (
    <div>
      {gamesData?.length > 0 && (
        <>
          <h3 className={styles.Title}>{title}</h3>
          <div className={styles.TableContainer}>
            <UserGameListDesktop data={gamesData} />
          </div>
          <div className={styles.TableContainerSmall}>
            <UserGameListMobile data={gamesData} />
          </div>
        </>
      )}
    </div>
  );
}

export default UserGamesTable;
