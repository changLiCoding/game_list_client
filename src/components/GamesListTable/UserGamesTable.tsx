import { Game } from '@/graphql/__generated__/graphql';
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
  const games = gamesData.map((val: Game) => ({
    key: val.id,
    ...val,
  }));
  return (
    <div>
      {games?.length > 0 && (
        <>
          <h3 className={styles.Title}>{title}</h3>
          <div className={styles.TableContainer}>
            <UserGameListDesktop data={games} />
          </div>
          <div className={styles.TableContainerSmall}>
            <UserGameListMobile data={games} />
          </div>
        </>
      )}
    </div>
  );
}

export default UserGamesTable;
