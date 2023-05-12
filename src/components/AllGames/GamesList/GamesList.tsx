import { theme, Card, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import GameCard from '@/components/AllGames/GamesList/GameCard';
import List from '@/components/AllGames/GamesList/List';
import useAllGames from '@/services/games/useAllGames';

import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import { Game as GameType } from '@/graphql/__generated__/graphql';

export default function GamesList({ isCardView }: { isCardView: boolean }) {
  const { games } = useAllGames();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content>
      {isCardView ? (
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
                key={game.id}
                game={game}
                colorBgContainer={colorBgContainer}
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
                  key={game.id}
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
