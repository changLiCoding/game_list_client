import styles from '@/components/Trend/GamesTrends/GamesTrends.module.scss';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function GamesTrends({ games, title }: { games: GameType[]; title: string }) {
  return (
    <div>
      <div className={styles.trendHeader}>
        <h2>{title}</h2>
      </div>
      <div className={styles.trendBody}>
        {games.map((game) => (
          <div className={styles.trendGameCard} key={game.id}>
            {game.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesTrends;
