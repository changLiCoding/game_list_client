import { theme, Card, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import GameCard from '@/components/AllGames/GamesList/GameCard';
import useAllGames from '@/services/games/useAllGames';

// import styles from '@/components/AllGames/GamesList/Game/Game.module.scss';

export default function GamesList() {
  const { games } = useAllGames();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content>
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
    </Content>
  );
}
