import { Link } from 'react-router-dom';
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
            <a
              href={`/game-detail/${game.id}/${game.name}`}
              style={{ backgroundImage: `url(${game.imageURL})` }}
            >
              <Link to={`/game-detail/${game.id}/${game.name}`} />
            </a>
            <div className={styles.trendContent}>
              <a href={`/game-detail/${game.id}/${game.name}`}>{game.name}</a>
              <div className={styles.trendInfo}>
                {title === 'Trending Games'
                  ? `Score:${game?.avgScore}`
                  : `Total Played: ${game?.totalRating}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesTrends;
