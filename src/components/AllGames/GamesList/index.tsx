import { theme, Card, Row } from 'antd';

import { Content } from 'antd/es/layout/layout';

// import type { Game } from "@/graphql/__generated__/graphql";
import Game from '@/components/AllGames/GamesList/Game/Game';
import useAllGames from '@/services/games/useAllGames';

import './GamesList.scss';

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
            games.map((game: any) => (
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
