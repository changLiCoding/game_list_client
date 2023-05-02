import { theme, Card, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Game from '@/components/AllGames/GamesList/Game';
import useAllGames from '@/services/games/useAllGames';
import { Game as GameType } from '@//graphql/__generated__/graphql';

// import styles from '@/components/AllGames/GamesList/Game/Game.module.scss';

export default function Games() {
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
          {games &&
            games.map((game: GameType) => (
              <Game
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
