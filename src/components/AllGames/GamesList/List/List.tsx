import { Game as GameType } from '@/graphql/__generated__/graphql';
import styles from '@/components/AllGames/GamesList/List/List.module.scss';

function List({
  game,
  colorBgContainer,
}: {
  game: GameType;
  colorBgContainer: string;
}): JSX.Element {
  return (
    <div
      className={styles.gameListContainer}
      style={{ backgroundColor: `${colorBgContainer}` }}
    >
      <div className={styles.gameRankNumber}>
        <span className={styles.gameRankHash}>#</span>
        {game.id}
      </div>
      <a
        href={`/game-detail/${game.id}/${game.name}`}
        className={styles.gameLink}
      >
        {game.imageURL && (
          <img
            src={game?.imageURL}
            className={styles.gameImage}
            alt={game.name}
          />
        )}
      </a>
      <div className={styles.gameContent}>{game.name}</div>
    </div>
  );
}

export default List;
