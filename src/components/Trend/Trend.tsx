import React from 'react';

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

  return (
    <div>
      <div>
        {bestsLoading ? (
          <div>Loading</div>
        ) : (
          <GamesTrends title="Highest Rating" games={bestGames} />
        )}

        {mostPlayedLoading ? (
          <div>Loading</div>
        ) : (
          <GamesTrends title="Mosted Played" games={mostPlayedGames} />
        )}
      </div>
    </div>
  );
}

export default Trend;
