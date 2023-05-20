import { theme, Card, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import GameCard from '@/components/AllGames/GamesList/GameCard';
import List from '@/components/AllGames/GamesList/List';
import useAllGames from '@/services/games/useAllGames';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import { useAppSelector } from '@/app/hooks';
import useUserGameByIdv2 from '@/services/userGames/useUserGameByIdv2';

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const { userGameLoading, fetchUserGame } = useUserGameByIdv2();

  const { games, refetch } = useAllGames(
    homeSearchState.filters.genres,
    homeSearchState.filters.tags,
    homeSearchState.filters.platforms
  );

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch, homeSearchState.filters]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content>
      {homeSearchState.view === 'grid' ? (
        <Card title="All Games">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              xl: 32,
            }}
          >
            {games.map((game) => (
              <GameCard
                key={`grid-${game.id}`}
                game={game}
                colorBgContainer={colorBgContainer}
                userGameLoading={userGameLoading}
                fetchUserGame={fetchUserGame}
              />
            ))}
          </Row>
        </Card>
      ) : (
        <div className={styles.allListContainer}>
          <div className={styles.allListTitle}>All Games</div>
          <div className={styles.allListDivider}>
            {[...games]
              .sort((a, b) => {
                return parseInt(a.id, 10) - parseInt(b.id, 10);
              })
              .map((game) => (
                <List
                  key={`list-${game.id}`}
                  game={game}
                  colorBgContainer={colorBgContainer}
                />
              ))}
          </div>
        </div>
      )}
    </Content>
  );
}
