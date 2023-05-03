import UserGameListDesktop from './Desktop';
import UserGameListMobile from './Mobile';
import styles from './UserGamesTable.module.scss';

function UserGamesTable({
  gamesData,
  title,
}: {
  gamesData: any;
  title: string;
}) {
  return (
    <div>
      {gamesData?.length > 0 && (
        <>
          <p>{title}</p>
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
