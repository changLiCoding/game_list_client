import styles from '@/components/Trend/GamesTrends/GamesTrends.module.scss';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function GamesTrends({ games, title }: { games: GameType[] }) {
  return (
    <div>
      <div className={styles.trendHeader}>header</div>
      <div className={styles.trendBody}>trend body</div>
    </div>
  );
}

export default GamesTrends;
