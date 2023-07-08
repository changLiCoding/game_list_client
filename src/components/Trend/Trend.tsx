import React from 'react';
import styles from '@/components/Trend/Trend.module.scss';

import useAllGames from '@/services/games/useAllGames';
import GamesTrends from '@/components/Trend/GamesTrends/GamesTrends';

function Trend() {
  const { games: bestGames, loading: bestsLoading } = useAllGames(
    undefined,
    undefined,
    undefined,
    undefined,
    'avg_score',
    undefined,
    20,
    0
  );

  const { games: mostPlayedGames, loading: mostPlayedLoading } = useAllGames(
    undefined,
    undefined,
    undefined,
    undefined,
    'total_rating',
    undefined,
    20,
    0
  );

  console.log(bestGames);
  console.log(mostPlayedGames);
  return (
    <div>
      <div className={styles.trend}>
        {bestsLoading ? <div>Loading</div> : <GamesTrends games={bestGames} />}

        {mostPlayedLoading ? (
          <div>Loading</div>
        ) : (
          <GamesTrends games={mostPlayedGames} />
        )}
      </div>
    </div>
  );
}

export default Trend;
