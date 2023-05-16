import styles from '@/components/ProfileContent/Overview/SideSection/ListCards/ListCards.module.scss';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function ListCards({
  status,
  gameData,
}: {
  status: string;
  gameData: GameType[];
}) {
  return (
    <div className={styles.listContainer}>
      <h2>{status}</h2>
      <div className={styles.listCards}>
        {Array.isArray(gameData) &&
          gameData.length > 0 &&
          gameData.map((game) => {
            return (
              <a
                className={styles.listCard}
                key={game.id}
                href={`/game-detail/${game.id}/${game.name}`}
              >
                {game.imageURL && <img src={game.imageURL} alt={game.name} />}
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default ListCards;